module.exports = {
  mongoURI: process.env.MONGO_URI,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleCallbackURL: "/auth/google/callback",
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  baseURL: "https://users-feedback-app.herokuapp.com"
};
