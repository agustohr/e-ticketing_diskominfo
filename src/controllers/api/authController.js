const passport = require('../../lib/passport')

module.exports = {

    register : passport.authenticate('signup-local', {
        successRedirect: '/login',
        failureRedirect: '/register',
        failureFlash: true // Untuk mengaktifkan express flash
    }),

    login : passport.authenticate('pegawai-local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true // Untuk mengaktifkan express flash
    }),

    loginAdmin : passport.authenticate('admin-local', {
        successRedirect: '/homeAdmin',
        failureRedirect: '/loginAdmin',
        failureFlash: true // Untuk mengaktifkan express flash
    }),

    changepassword : passport.authenticate('changepassword-local', {
        successRedirect: '/home/profile',
        failureRedirect: '/home/profile',
        failureFlash: true, // Untuk mengaktifkan express flash
        session: false
    }),

    // changepassword: (req, res) => {
    //     User.changePassword(req.body)
    //       .then((users) =>
    //         res.json(users))
    //       .catch((err) => res.json(err));
    // },

    logout : function(req, res, next) {
        req.logout(function(err){
            if (err) { return next(err)}
            res.redirect('/');
        });
    },

}
