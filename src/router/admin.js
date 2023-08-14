// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const { api } = require('../controllers');

router.get('/incident', api.incTicket.incidentTicketList);
router.get('/incident/detail/:ticketID', api.incTicket.incidentTicketDetailPegawaiAdmin);
router.get('/incidentDinas', api.incTicket.incidentTicketDinasAdmin);
router.get('/incidentDinas/detail/:ticketID', api.incTicket.incidentTicketDetailDinasAdmin);
router.get('/request', api.reqTicket.requestTicketList);
router.get('/request/detail/:ticketID', api.reqTicket.requestTicketDetailPegawaiAdmin);
router.get('/requestDinas', api.reqTicket.requestTicketDinasAdmin);
router.get('/requestDinas/detail/:ticketID', api.reqTicket.requestTicketDetailDinasAdmin);
router.get('/akun_pegawai', api.users.akunPegawaiList);
router.get('/akun_dinas', api.users.akunDinasList);
router.get('/akun_admin', api.users.akunAdminList);
// router.get('/approve_akun_dinas', api.users.approveAkunDinasList);
router.get('/message', api.message.messageListAdmin);
router.get('/profile', api.users.showMyProfileAdmin);
router.get('/report', api.all_ticket.reportTicket);
router.get('/reportThisMonth', api.all_ticket.generateThisMonth);
router.get('/reportLastMonth', api.all_ticket.generateLastMonth);
router.post('/reportCustomMonth', api.all_ticket.generateCustomMonth);

module.exports = router;