import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PremiumFeatures() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const [showPayment, setShowPayment] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    setShowPayment(true)
    // Scroll to payment section
    setTimeout(() => {
      document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handlePaymentChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitPayment = (e) => {
    e.preventDefault()
    // Here you would integrate with a payment processor like Stripe
    alert(`Thank you for subscribing to the ${selectedPlan} plan! You now have access to all profiting startups.`)
    // Store premium status
    localStorage.setItem('isPremium', 'true')
    localStorage.setItem('premiumPlan', selectedPlan)
    // Redirect back to dashboard
    navigate('/investor')
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-hover p-8 md:p-10 text-white shadow-card mb-8">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Premium Features </h1>
          <p className="text-white/90 text-lg">
            Unlock exclusive benefits and get access to all profiting startups
          </p>
        </div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl shadow-card border border-brand-dark/30 p-6 mb-8">
        <h2 className="text-2xl font-bold text-text mb-6">Choose Your Experience</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="border rounded-xl p-6 bg-gray-50">
            <h3 className="text-xl font-bold text-text mb-2">Free</h3>
            <p className="text-3xl font-bold text-text mb-4">0 ETB</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-green-600">
                <span>●</span> <span className="text-text">View all startups</span>
              </li>
              <li className="flex items-center gap-2 text-green-600">
                <span>●</span> <span className="text-text">Basic analytics</span>
              </li>
              <li className="flex items-center gap-2 text-green-600">
                <span>●</span> <span className="text-text">Community access</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>X</span> <span className="text-gray-500">Profiting startups filter</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>X</span> <span className="text-gray-500">Early access</span>
              </li>
            </ul>
            <button 
              className="w-full bg-gray-200 text-gray-600 py-2 rounded-lg font-medium cursor-not-allowed"
              disabled
            >
              Current Plan
            </button>
          </div>

          {/* Monthly Plan */}
          <div className="border-2 border-primary rounded-xl p-6 bg-white shadow-lg relative transform hover:scale-105 transition-all">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
              POPULAR
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Monthly Premium</h3>
            <p className="text-3xl font-bold text-text mb-1">1,399 ETB</p>
            <p className="text-sm text-text-muted mb-4">per month</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-green-600">
                <span>●</span> <span className="text-text">Everything in Free</span>
              </li>
              <li className="flex items-center gap-2 text-primary font-semibold">
                <span>*</span> <span className="text-text">Profiting startups filter</span>
              </li>
              <li className="flex items-center gap-2 text-primary font-semibold">
                <span>*</span> <span className="text-text">24h early access</span>
              </li>
              <li className="flex items-center gap-2 text-primary font-semibold">
                <span>*</span> <span className="text-text">Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2 text-primary font-semibold">
                <span>*</span> <span className="text-text">Priority support</span>
              </li>
            </ul>
            <button 
              onClick={() => handlePlanSelect('monthly')}
              className="w-full bg-gradient-to-r from-primary to-primary-hover text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Choose Monthly
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="text-xl font-bold text-text mb-2">Yearly Premium</h3>
            <p className="text-3xl font-bold text-text mb-1">13,990 ETB</p>
            <p className="text-sm text-green-600 font-semibold mb-1">Save 20%</p>
            <p className="text-sm text-text-muted mb-4">1,165 ETB/month</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-green-600">
                <span>●</span> <span className="text-text">Everything in Monthly</span>
              </li>
              <li className="flex items-center gap-2 text-primary font-semibold">
                <span>*</span> <span className="text-text">2 months free</span>
              </li>
              <li className="flex items-center gap-2 text-primary font-semibold">
                <span>*</span> <span className="text-text">Exclusive webinars</span>
              </li>
              <li className="flex items-center gap-2 text-primary font-semibold">
                <span>*</span> <span className="text-text">1-on-1 consultation</span>
              </li>
            </ul>
            <button 
              onClick={() => handlePlanSelect('yearly')}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Choose Yearly
            </button>
          </div>
        </div>
      </div>

      {/* What Premium Adds Section */}
      <div className="bg-brand rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-text mb-4"> What Premium Adds to Your Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <span className="text-2xl">-</span>
            <div>
              <h3 className="font-bold text-text">Profiting Startups Filter</h3>
              <p className="text-text-muted">Automatically filter and see only startups that are already generating revenue and profits. Save hours of research time.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">-</span>
            <div>
              <h3 className="font-bold text-text">24-Hour Early Access</h3>
              <p className="text-text-muted">Get notified about new profitable startups a full day before free members. Be the first to invest.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">-</span>
            <div>
              <h3 className="font-bold text-text">Advanced Profit Analytics</h3>
              <p className="text-text-muted">See detailed revenue reports, profit margins, and growth projections for all profiting startups.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">-</span>
            <div>
              <h3 className="font-bold text-text">Smart Matching</h3>
              <p className="text-text-muted">Our AI matches you with profiting startups that fit your investment criteria perfectly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      {showPayment && (
        <div id="payment-section" className="bg-white rounded-xl shadow-card border-2 border-primary p-8 mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-text mb-2">Complete Your Subscription</h2>
          <p className="text-text-muted mb-6">
            You're subscribing to the <span className="font-bold text-primary">{selectedPlan === 'monthly' ? 'Monthly Premium (1,399 ETB/month)' : 'Yearly Premium (13,990 ETB/year)'}</span> plan
          </p>

          <form onSubmit={handleSubmitPayment} className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-text font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentDetails.cardName}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Abebe Kebede"
                  required
                />
              </div>

              <div>
                <label className="block text-text font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="4242 4242 4242 4242"
                  maxLength="19"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-text font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handlePaymentChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-sm text-text-muted mb-2">Your subscription includes:</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">✅ Access to profiting startups filter</li>
                  <li className="flex items-center gap-2">✅ 24-hour early access to new startups</li>
                  <li className="flex items-center gap-2">✅ Advanced profit analytics</li>
                  <li className="flex items-center gap-2">✅ Cancel anytime</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-primary-hover text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Pay {selectedPlan === 'monthly' ? '1,399 ETB' : '13,990 ETB'} & Get Premium Access
                </button>
                <button
                  type="button"
                  onClick={() => setShowPayment(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>

            <p className="text-xs text-text-muted text-center mt-4">
              🔒 Secure payment processing. Your card details are encrypted.
            </p>
          </form>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center">
        <button 
          onClick={() => navigate('/investor')}
          className="text-primary hover:text-primary-hover font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  )
}

export default PremiumFeatures