// const router = require('express').Router();
const express = require('express');
const router = express.Router();

const controller = require('../controllers');

const api = require('./api')
const admin = require('./admin')
const pegawai = require('./pegawai')

// Controllers
const auth = require('./../controllers/api/authController' )
const verify = require('../controllers/api/verify')
const verifyAdmin = require('../controllers/api/verifyAdmin')


// =================Register Page
router.get('/register' , (req, res) => res.render('sign-up'))
// router.get('/verifikasi' , (req, res) => res.render('verifikasi'))
router.post('/register' , auth.register )


// router.get('/verify-email', auth.verification);

//endpoint image
router.use('/public/surat_permohonan', express.static('public/surat_permohonan'));
router.use('/public/lampiran_request', express.static('public/lampiran_request'));
router.use('/public/lampiran_incident', express.static('public/lampiran_incident'));
router.use('/public/templateLampiran', express.static('public/templateLampiran'));
//endpoint image
router.use('/public/assets/img', express.static('public/assets/img'));

// router.get('/get_all_dinas', controller.getAllDinas);
// router.post('/add_dinas', controller.addDinas);

//====================login
// router.get('/login', (req, res) => res.render('login'))
router.post('/login', auth.login)

/* Handle Logout */
router.get('/logout', auth.logout);

router.get('/', controller.index);
router.get('/login', controller.login);
// router.get('/about', function(req, res) {
//     res.render('pages/about');
// });

//======================loginAdmin
router.get('/loginAdmin', function(req, res) {
    res.render('pages/admin/login');
});
router.post('/loginAdmin', auth.loginAdmin);

router.post('/changepassword', auth.changepassword);

router.get('/home', verify, controller.homePegawai);
router.get('/homeAdmin', verifyAdmin, controller.homeAdmin);


router.use('/api', api);
router.use('/homeAdmin', verifyAdmin, admin);
router.use('/home', verify, pegawai);




module.exports = router;
