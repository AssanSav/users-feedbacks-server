const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
// const FacebookStrategy = require("passport-facebook").Strategy
const mongoose = require("mongoose")
const keys = require("../config/keys")

const User = mongoose.model("users")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

// passport.use(
//   new FacebookStrategy({
//     clientID: keys.facebookClientID,
//     clientSecret: keys.facebookClientSecret,
//     callbackURL: keys.facebookCallbackURL
//   },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile)
//       User.findOne({ facebookId: profile.id }).then((existingUser) => {
//         if (existingUser) {
//           done(null, existingUser)
//         } else {
//           new User({ facebookId: profile.id })
//             .save()
//             .then((user) => {
//               done(null, user)
//             })
//         }
//       }).catch((err) => {
//         console.log(err)
//       })
//     }
//   )
// )

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: keys.googleCallbackURL,
    proxy: true
  },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        done(null, existingUser)
      } else {
        const user = new User({
          googleId: profile.id,
          email: profile.emails[0].value
        })
        await user.save()
        done(null, user)
      }
    }
  )
)

