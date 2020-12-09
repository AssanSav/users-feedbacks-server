// const passport = require("passport")

// module.exports = (app) => {
//   app.get(
//     "/auth/facebook",
//     passport.authenticate("facebook")
//   )

//   app.get(
//     "/auth/facebook/callback",
//     passport.authenticate("facebook")
//   )

//   app.get("/api/current_user", (req, res) => {
//     res.send(req.user)
//   })

//   app.get("/api/logout", (req, res) => {
//     req.logout()
//     res.send(req.user)
//   })
// }