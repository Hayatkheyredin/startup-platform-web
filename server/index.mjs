import axios from 'axios';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' (if needed, though this is primarily an API server now)
app.use(express.static(path.join(__dirname, '../public')));

// Root route for checking server status
app.get('/', (req, res) => {
  res.send(`
    <h1>M-Pesa Integration Server</h1>
    <p>Status: <span style="color:green; font-weight:bold;">Running</span></p>
    <p>This is the backend for M-Pesa callbacks.</p>
  `);
});

// --- Configuration ---
const config = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  shortCode: process.env.MPESA_SHORTCODE,
  passkey: process.env.MPESA_PASSKEY,
  environment: process.env.MPESA_ENVIRONMENT, // 'sandbox' or 'production'
  callbackUrl: process.env.MPESA_CALLBACK_URL,
  demoMode: process.env.DEMO_MODE === 'true',
};

// Base URL for API
const BASE_URL = config.environment === 'production' 
  ? 'https://api.safaricom.et' 
  : 'https://apisandbox.safaricom.et';

// --- Helper Functions ---

// 1. Generate Timestamp (YYYYMMDDHHmmss)
const getTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hour}${minute}${second}`;
};

// 2. Generate Password
const generatePassword = (shortCode, passkey, timestamp) => {
  const str = shortCode + passkey + timestamp;
  const hash = crypto.createHash('sha256').update(str).digest('hex');
  return Buffer.from(hash).toString('base64');
};

// 3. Get Access Token (Authentication)
let accessToken = null;
let tokenExpiry = 0;

const getAccessToken = async () => {
  // Check if token is still valid (with 5 min buffer)
  if (accessToken && Date.now() < tokenExpiry - 300000) {
    return accessToken;
  }

  const auth = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString('base64');

  try {
    const response = await axios.get(`${BASE_URL}/v1/token/generate`, {
      headers: { 'Authorization': `Basic ${auth}` },
      params: { 'grant_type': 'client_credentials' },
    });

    accessToken = response.data.access_token;
    // Token is valid for 3599 seconds usually
    tokenExpiry = Date.now() + (parseInt(response.data.expires_in) * 1000);
    console.log('New Access Token generated:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to generate access token:', error.response ? error.response.data : error.message);
    throw new Error('Authentication failed');
  }
};

// --- Routes ---

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: config.environment,
    demoMode: config.demoMode,
    baseUrl: BASE_URL,
    callbackUrl: config.callbackUrl,
    credentialsSet: !!(config.consumerKey && config.consumerSecret && config.passkey)
  });
});

// 2. Test Authentication
app.get('/api/test-auth', async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({ success: true, message: 'Authentication Successful', token: token.substring(0, 10) + '...' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Initiate STK Push Payment
app.post('/api/stk-push', async (req, res) => {
  // Added /api prefix to match proxy cleanly
  const { phoneNumber, amount, accountReference = 'ORDER-001', transactionDesc = 'Payment' } = req.body;

  if (!phoneNumber || !amount) {
    return res.status(400).json({ error: 'Phone number and amount are required' });
  }

  // Format phone number: convert 09... to 2519...
  let formattedPhone = phoneNumber.replace(/\D/g, ''); // remove non-digits
  if (formattedPhone.startsWith('0')) formattedPhone = '251' + formattedPhone.substring(1);
  if (formattedPhone.startsWith('9') && formattedPhone.length === 9) formattedPhone = '251' + formattedPhone;
  
  // Ensure it starts with 251 (Ethiopia code)
  if (!formattedPhone.startsWith('251')) {
    return res.status(400).json({ error: 'Invalid phone number format. Must look like 2519XXXXXXXX' });
  }

  if (config.demoMode) {
    console.log(`[DEMO MODE] STK Push request for ${formattedPhone} Amount: ${amount}`);
    // Simulate successful response
    // Delay slightly to simulate network
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return res.json({
      MerchantRequestID: `demo-${Date.now()}`,
      CheckoutRequestID: `ws_CO_${Date.now()}`,
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing",
      CustomerMessage: "Success. Request accepted for processing"
    });
  }

  try {
    // Attempt to get token
    const token = await getAccessToken();
    const timestamp = getTimestamp();
    const password = generatePassword(config.shortCode, config.passkey, timestamp);

    const payload = {
      "MerchantRequestID": crypto.randomUUID(),
      "BusinessShortCode": config.shortCode,
      "Password": password,
      "Timestamp": timestamp,
      "TransactionType": "CustomerPayBillOnline",
      "Amount": amount,
      "PartyA": formattedPhone,
      "PartyB": config.shortCode,
      "PhoneNumber": formattedPhone,
      "CallBackURL": config.callbackUrl,
      "AccountReference": accountReference,
      "TransactionDesc": transactionDesc
    };

    console.log('Sending STK Push to:', payload.PhoneNumber);

    const response = await axios.post(
      `${BASE_URL}/mpesa/stkpush/v3/processrequest`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('STK Push Response:', response.data);
    res.json(response.data);

  } catch (error) {
    const errData = error.response ? error.response.data : error.message;
    console.error('STK Push Error:', errData);
    res.status(500).json({ error: 'STK Push Failed', details: errData });
  }
});

// 4. Callback URL (M-Pesa calls this)
app.post('/api/callback', (req, res) => {
  // M-Pesa might call /callback or /api/callback depending on what we registered. 
  // The .env says .../callback but usually it's cleaner to keep under /api or handle both.
  console.log('--- M-Pesa Callback Received ---');
  console.log(JSON.stringify(req.body, null, 2));
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

// Start Server
app.listen(port, () => {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║     M-Pesa Integration Test Server               ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  Dashboard:  http://localhost:${port}                ║`);
  console.log(`║  Environment: ${config.environment}                            ║`);
  console.log(`║  Demo Mode:  ${config.demoMode}                               ║`);
  console.log(`║  API Base:   ${BASE_URL}     ║`);
  console.log('╚══════════════════════════════════════════════════╝');
});
