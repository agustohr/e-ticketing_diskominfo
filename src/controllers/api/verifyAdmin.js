module.exports = (req, res, next) => {

  if (req.isAuthenticated()) {
    if (req.user.role == "admin") {
      return next();
    }else{
      return res.redirect('/home');
    }
  }
  res.redirect('/');
}