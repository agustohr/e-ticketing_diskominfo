const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../../models')
/* Fungsi untuk authentication */

async function authenticate(nip, password, done) {
    temp = "pegawai"
    console.log(temp)
    try {
        // console.log("masukuser")
        const user = await User.authenticate({ nip, password })
        return done(null, user)
    }
    catch(err) {
        console.log(err)
        return done(null, false, { message: err })
    }

}

async function authenticateAdmin(nip, password, done) {
    try {
        const user = await User.authenticateAdmin({ nip, password })
        return done(null, user)
    }
    catch(err) {
        return done(null, false, { message: err })
    }
}

async function changepassword(nip, newPassword, done) {
    try {
        console.log("=========================")
        console.log(nip)
        console.log(newPassword)
        console.log(oldPassword)
        const user = await User.changePassword(req.body)
        return done(null, user)
    }
    catch(err) {
        return done(null, false, { message: err })
    }
}


passport.use('pegawai-local', new LocalStrategy({ usernameField: 'nip', passwordField: 'password' }, authenticate))
passport.use('admin-local', new LocalStrategy({ usernameField: 'nip', passwordField: 'password' }, authenticateAdmin))
// passport.use('changepassword-local', new LocalStrategy({ usernameField: 'nip', passwordField: 'newPassword' }, changepassword))
passport.use('changepassword-local', new LocalStrategy({
    usernameField: 'nip', // map username to custom field, we call it email in our form
    passwordField: 'newPassword',
    passReqToCallback: true // lets you access other params in req.body
  },
  async (req, nip, newPassword, done) => {
    try {
        // console.log("masukuser")
        const user = await User.changePassword(req.body)
        return done(null, user)
    }
    catch(err) {
        console.log(err)
        return done(null, false, { message: err })
    }
  }
))
/* Serialize dan Deserialize
 Cara untuk membuat sesi dan menghapus sesi
*/

passport.serializeUser((user, done) => done(null, user.id))
passport.serializeUser((userAdmin, done) => done(null, userAdmin.id))

passport.deserializeUser(
    async (id, done) => done(null, await User.findByPk(id))
)


// Kita exports karena akan kita gunakan sebagai middleware
module.exports = passport
