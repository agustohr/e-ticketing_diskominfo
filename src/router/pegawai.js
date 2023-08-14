// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const { api } = require('../controllers');

router.get('/incident', api.incTicket.incidentTicketPage);
router.get('/incident/detail/:ticketID', api.incTicket.incidentTicketDetailPegawai);
router.get('/incidentDinas', api.incTicket.incidentTicketDinas);
router.get('/incidentDinas/detail/:ticketID', api.incTicket.incidentTicketDetailDinas);
router.get('/request', api.reqTicket.requestTicketPage);
router.get('/request/detail/:ticketID', api.reqTicket.requestTicketDetailPegawai);
router.get('/requestDinas', api.reqTicket.requestTicketDinas);
router.get('/requestDinas/detail/:ticketID', api.reqTicket.requestTicketDetailDinas);
router.get('/message', api.message.messageListPegawai);
router.get('/profile', api.users.showMyProfile);
router.get('/register_dinas_account', api.users.showRegAkunDinas);



module.exports = router;