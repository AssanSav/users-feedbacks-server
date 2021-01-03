module.exports = {
  baseURL: "https://users-feedback-app.herokuapp.com",
  googleCallbackURL: "https://stormy-taiga-64394.herokuapp.com/auth/google/callback",
  mongoURI: process.env.MONGO_URI,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY
};

