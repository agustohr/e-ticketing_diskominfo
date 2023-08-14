module.exports = (req, res, next) => {

  if (req.isAuthenticated()) {
    if (req.user.role == "pegawai") {
      return next();
    }else{
      return res.redirect('/homeAdmin');
    }
  }
  res.redirect('/');
}