# WaveTracker 🌊

A full-stack wave forecast web app for Israeli beaches. Users select a beach, set wave and wind thresholds, and receive a daily Telegram digest whenever conditions match their preferences.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, plain CSS |
| Backend | Node.js, Express, Passport.js (session auth) |
| Database | PostgreSQL |
| Forecast API | Stormglass.io |
| Alerts | Telegram Bot API (node-telegram-bot-api) |
| Scheduler | node-cron |

## Features

- **Live dashboard** — current conditions + today's hourly forecast + 7-day week view
- **Beach selection** — choose from 9 Israeli Mediterranean and Red Sea beaches
- **Subscription plans** — Free (forecast only) and Pro (Telegram alerts)
- **Custom alert thresholds** — set minimum wave height, minimum wind speed (windsurfers), maximum wind speed
- **Telegram integration** — daily morning digest grouped by day and time of day

## Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL
- A [Stormglass](https://stormglass.io) API key
- A Telegram bot token from [@BotFather](https://t.me/BotFather)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/wave-tracker.git
cd wave-tracker

# 2. Install server dependencies
cd server && npm install

# 3. Install client dependencies
cd ../client && npm install

# 4. Configure environment variables
cd ../server
cp .env.example .env
# Fill in your values in .env

# 5. Set up the database
psql -U postgres -c "CREATE DATABASE wave_tracker;"
psql -U postgres -d wave_tracker -f db/schema.sql
psql -U postgres -d wave_tracker -f db/seeds.sql

# 6. Start the server (port 3001)
npm run dev

# 7. Start the client (port 5173)
cd ../client && npm run dev
```

## Project Structure

```
wave-tracker/
├── server/
│   ├── config/         # Passport.js auth strategy
│   ├── db/             # Schema, seeds, pg pool
│   ├── middleware/      # isAuthenticated guard
│   ├── routes/         # auth, beaches, forecasts, preferences, plans
│   └── services/       # stormglass (API fetch), alerts, cron, telegram
└── client/
    └── src/
        ├── api/         # Axios instance
        ├── context/     # AuthContext (global auth state)
        ├── components/  # Navbar, ProtectedRoute
        └── pages/       # Dashboard, Settings, Plans, ConnectTelegram, Login, Register
```
