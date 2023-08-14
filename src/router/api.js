// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const { api } = require('../controllers');
const { users, reqTicket, incTicket, validate } = require('../lib/validator.js');
let path = require('path');

// dependency multer
const multer = require("multer");
const maxSize = 1 * 1024 * 1024 //1mb
const storage = multer.diskStorage({
  // set direktori dimana gambar yg di upload akan disimpan
  destination: function (req, file, cb) {
    cb(null, 'public/surat_permohonan');
  },
  // set nama file ketika gambar disimpan
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if(file.mimetype == "application/pdf"){
      cb(null, true);
    }else{
      cb(null, false);
      return cb(new Error('Only .pdf format allowed!'));
    }
  },
  limits: {fileSize: maxSize}
 });

// =================Upload Excel ============================
const storageExcel = multer.diskStorage({
  // set direktori dimana gambar yg di upload akan disimpan
  destination: function (req, file, cb) {
    cb(null, 'public/dataPegawaiExcel');
  },
  // set nama file ketika gambar disimpan
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});
const uploadExcel = multer({ 
  storage: storageExcel,
  fileFilter: function (req, file, cb) {
    if(file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      cb(null, true);
    }else{
      cb(null, false);
      return cb(new Error('Only .xlsx format allowed!'));
    }
  },
  limits: {fileSize: maxSize}
 });

const storageLampiranIncident = multer.diskStorage({
  // set direktori dimana gambar yg di upload akan disimpan
  destination: function (req, file, cb) {
    cb(null, 'public/lampiran_incident');
  },
  // set nama file ketika gambar disimpan
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const uploadLampiranIncident = multer({ 
  storage: storageLampiranIncident,
  fileFilter: function (req, file, cb) {
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
      cb(null, true);
    }else{
      cb(null, false);
      return cb(new Error('Only .png .jpg and .jpeg format allowed!'));
    }
  },
  limits: {fileSize: maxSize}
 });

const storageLampiranRequest = multer.diskStorage({
  // set direktori dimana gambar yg di upload akan disimpan
  destination: function (req, file, cb) {
    cb(null, 'public/lampiran_request');
  },
  // set nama file ketika gambar disimpan
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const uploadLampiranRequest = multer({ 
  storage: storageLampiranRequest,
  fileFilter: function (req, file, cb) {
    if(file.mimetype == "application/pdf"){
      cb(null, true);
    }else{
      cb(null, false);
      return cb(new Error('Only .pdf format allowed!'));
    }
  },
  limits: {fileSize: maxSize}
 });


//endpoint management Users
router.get('/get_all_user', api.users.getAll);
router.get('/get_user_by_id/:id', api.users.getById);
router.post('/add_user',users(), validate, api.users.add);
router.delete('/delete_user/:id', api.users.delete);
router.put('/update_user/:id', api.users.update);
router.put('/update_profile/:id', api.users.editProfile);
router.post('/add_pegawai', api.users.addPegawai);
router.put('/reset_password/:id', api.users.resetPasswordPegawai);

router.post('/add_pegawai_excel', uploadExcel.single('excel'), api.users.addPegawaiExcel);

router.put('/regAkunDinas/:id', upload.single('surat_permohonan'), api.users.regAkunDinas);
router.put('/approvedDinas/:id', api.users.approvedAkunDinas);

//endpoint management request ticket
router.get('/get_all_reqTicket', api.reqTicket.getAll);
router.get('/get_reqTicket_by_id/:id', api.reqTicket.getById);
router.post('/add_reqTicket', api.reqTicket.add);
router.post('/add_reqTicketLampiran', uploadLampiranRequest.single('lampiran'), api.reqTicket.addWithLampiran);
router.delete('/delete_reqTicket/:id', api.reqTicket.delete);
router.put('/update_reqTicket/:id', api.reqTicket.update);
// router.post('/newReqTicket', upload.single('image'), api.reqTicket.newReqTicket);

//endpoint management incident ticket
router.get('/get_all_incTicket', api.incTicket.getAll);
router.get('/get_incTicket_by_id/:id', api.incTicket.getById);
router.post('/add_incTicket', api.incTicket.add);
router.post('/add_incTicketLampiran', uploadLampiranIncident.single('lampiran'), api.incTicket.addWithLampiran);
router.delete('/delete_incTicket/:id', api.incTicket.delete);
router.put('/update_incTicket/:id', api.incTicket.update);
// router.post('/newIncTicket', upload.single('image'), api.incTicket.newIncTicket);

//endpoint management message
router.get('/get_all_message', api.message.getAll);
router.get('/get_message_by_id/:id', api.message.getById);
router.post('/add_message', api.message.add);
router.delete('/delete_message/:id', api.message.delete);
router.put('/update_message/:id', api.message.update);

//endpoint management notification
router.get('/get_all_notification', api.notification.getAll);
router.get('/get_notification_by_id/:id', api.notification.getById);
router.post('/add_notification', api.notification.add);
router.delete('/delete_notification/:id', api.notification.delete);
router.put('/update_notification/:id', api.notification.update);



//endpoint image
router.use('/public/surat_permohonan', express.static('public/surat_permohonan'));

module.exports = router;