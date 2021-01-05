const passport = require("passport");
const keys = require("../config/keys");

module.exports = function (app) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log("Cookie:", req.headers.cookie)
      res.cookie("auth", req.headers.cookie, {
        domain: keys.baseURL,
        httpOnly: false,
        maxAge: 30 * 24 * 60 * 60 * 1000
      })
      res.redirect(`${keys.baseURL}/surveys`);
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect(keys.baseURL);
  });
};
