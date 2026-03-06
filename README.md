# Women Startup Platform - Web App

Hackathon MVP web frontend for the Women Startup Platform. Built with React, React Router, and Bootstrap.

## Design

- **Color palette**: White, dark charcoal grey, orange/peach accent
- **Style**: Clean, minimalist, professional
- **Layout**: Split panels, card-based grids, responsive

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── layout/       # Navbar, Sidebar, MainLayout
│   ├── ui/           # Modal, etc.
│   └── StartupCard.jsx
├── pages/            # Page components
│   ├── LoginPage.jsx
│   ├── investor/     # Investor Dashboard pages
│   └── admin/        # Admin Dashboard pages
├── services/         # API calls
│   └── api.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## Pages

### Login
- Email, Password fields
- Login, Forgot Password buttons

### Investor Dashboard
- **Dashboard**: Overview of startups (cards)
- **Startup List**: All validated startups, filterable by industry, funding, stage
- **Startup Detail**: Team, idea, AI validation report, investment options
- **Investment Management**: Track interests and investments

### Admin Dashboard
- **User Management**: List users, block/unblock
- **Startup Monitoring**: List startups, track status
- **Platform Analytics**: Stats (users, startups, investments)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

**Demo login**: Use any email/password (API will fail; app redirects to Investor Dashboard). Use an email containing "admin" (e.g. `admin@test.com`) to access the Admin Dashboard.

## API

API calls are in `src/services/api.js`. Replace `API_BASE_URL` with your backend URL. Mock/demo data is shown when API calls fail.

## Routes

- `/login` - Login page
- `/investor` - Investor dashboard home
- `/investor/startups` - Startup list
- `/investor/startups/:id` - Startup detail
- `/investor/investments` - Investment management
- `/admin/users` - User management
- `/admin/startups` - Startup monitoring
- `/admin/analytics` - Platform analytics
