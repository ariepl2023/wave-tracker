import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import authRouter from "./routes/auth.js";
import beachesRouter from "./routes/beaches.js";
import forecastsRouter from "./routes/forecasts.js";
import preferencesRouter from "./routes/preferences.js";
import plansRouter from "./routes/plans.js";
import "./services/cron.js";
import "dotenv/config";
import "./services/telegram.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use("/beaches", beachesRouter);
app.use("/forecasts", forecastsRouter);
app.use("/preferences", preferencesRouter);
app.use("/plans", plansRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
