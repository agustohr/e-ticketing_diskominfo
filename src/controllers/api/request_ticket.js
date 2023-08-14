const { Request_Ticket } = require('../../../models');
const { Notification } = require('../../../models');
const { User } = require('../../../models');
const { Message } = require('../../../models');

module.exports = {

  getAll: (req, res) => {
    Request_Ticket.findAll()
      .then((reqTicket) => res.json(reqTicket))
      .catch((err) => res.json(err));
  },

  add: (req, res) => {
    Request_Ticket.addReqTicket(req.body)
      .then((reqTicket) =>
        res.json(reqTicket))
      .catch((err) => res.json(err));
  },

  addWithLampiran: (req, res) => {
    Request_Ticket.addReqTicket({ no_ticket: req.body.no_ticket,
      type: req.body.type,
      category: req.body.category,
      deskripsi: req.body.deskripsi,
      nip_pegawai: req.body.nip_pegawai,
      request_date: req.body.request_date,
      status: req.body.status,
      lampiran: req.file.path})
      .then((incTicket) =>
        res.json(incTicket))
      .catch((err) => res.json(err));
  },

  delete: (req, res) => {
    Request_Ticket.deleteReqTicket(req.params.id)
      .then(() => res.json({ msg: `Request ticket berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  update: (req, res) => {
    Request_Ticket.updateReqTicket(req.body, req.params.id)
      .then(() => res.json({ msg: "Update data request ticket berhasil" }))
      .catch((err) => res.json(err));
  },

  getById: (req, res) => {
    Request_Ticket.getReqTicketById(req.params.id)
      .then((reqTicket) => res.json(reqTicket))
      .catch((err) => res.json(err));
  },

  requestTicketPage: async (req, res) => {
    const reqTicket = await Request_Ticket.findAll();
    const notif = await Notification.findAll();
    res.render('pages/pegawai/request', {page_name: "Ticket Pegawai Request", users: req.user, reqTicket: reqTicket, notif: notif});
  },

  requestTicketDetailPegawai: async (req, res) => {
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    const pegawai = await User.findAll();
    Request_Ticket.getReqTicketByTicketID(req.params.ticketID)
      .then((reqTicket) => {
        res.render('pages/pegawai/requestDetail', {page_name: "Ticket Pegawai Request", users: req.user, pegawai: pegawai, reqTicket: reqTicket, notif: notif, message: message});
      })
      .catch((err) => res.json(err));
  },

  requestTicketDetailDinas: async (req, res) => {
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    const pegawai = await User.findAll();
    Request_Ticket.getReqTicketByTicketID(req.params.ticketID)
      .then((reqTicket) => {
        res.render('pages/pegawai/requestDetail', {page_name: "Ticket Dinas Request", users: req.user, pegawai: pegawai, reqTicket: reqTicket, notif: notif, message: message});
      })
      .catch((err) => res.json(err));
  },

  requestTicketDinas: async (req, res) => {
    const reqTicket = await Request_Ticket.findAll();
    const notif = await Notification.findAll();
    const pegawai = await User.findAll();
    res.render('pages/pegawai/requestDinas', {page_name: "Ticket Dinas Request", users: req.user, reqTicket: reqTicket, pegawai:pegawai, notif: notif});
  },

  // requestTicketDinas: async (req, res) => {
  //   const reqTicket = await Request_Ticket.findAll();
  //   res.render('pages/dinas/request', {users: req.user, reqTicket: reqTicket});
  // },

  requestTicketList: async (req, res) => {
    const reqTicket = await Request_Ticket.findAll();
    const notif = await Notification.findAll();
    const pegawai = await User.findAll();
    res.render('pages/admin/request', {page_name: "Ticket Pegawai Request",  users: req.user, reqTicket: reqTicket, pegawai: pegawai, notif: notif});
  },

  requestTicketDinasAdmin: async (req, res) => {
    const reqTicket = await Request_Ticket.findAll();
    const notif = await Notification.findAll();
    const pegawai = await User.findAll();
    res.render('pages/admin/requestDinas', {page_name: "Ticket Dinas Request", users: req.user, reqTicket: reqTicket, pegawai:pegawai, notif: notif});
  },

  requestTicketDetailPegawaiAdmin: async (req, res) => {
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    const pegawai = await User.findAll();
    Request_Ticket.getReqTicketByTicketID(req.params.ticketID)
      .then((reqTicket) => {
        res.render('pages/admin/requestDetail', {page_name: "Ticket Pegawai Request", users: req.user, reqTicket: reqTicket, pegawai: pegawai, notif: notif, message: message});
      })
      .catch((err) => res.json(err));
  },

  requestTicketDetailDinasAdmin: async (req, res) => {
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    const pegawai = await User.findAll();
    Request_Ticket.getReqTicketByTicketID(req.params.ticketID)
      .then((reqTicket) => {
        res.render('pages/admin/requestDetail', {page_name: "Ticket Dinas Request", users: req.user, reqTicket: reqTicket, pegawai: pegawai, notif: notif, message: message});
      })
      .catch((err) => res.json(err));
  },


};