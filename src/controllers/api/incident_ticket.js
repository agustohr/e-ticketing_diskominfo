const { Incident_Ticket } = require('../../../models');
const { Notification } = require('../../../models');
const { User } = require('../../../models');
const { Message } = require('../../../models');

module.exports = {

  getAll: (req, res) => {
    Incident_Ticket.findAll()
      .then((incTicket) => res.json(incTicket))
      .catch((err) => res.json(err));
  },

  add: (req, res) => {
    Incident_Ticket.addIncTicket(req.body)
      .then((incTicket) =>
        res.json(incTicket))
      .catch((err) => res.json(err));
  },

  addWithLampiran: (req, res) => {
    Incident_Ticket.addIncTicket({ no_ticket: req.body.no_ticket,
      type: req.body.type,
      category: req.body.category,
      deskripsi: req.body.deskripsi,
      nip_pegawai: req.body.nip_pegawai,
      incident_date: req.body.incident_date,
      status: req.body.status,
      lampiran: req.file.path})
      .then((incTicket) =>
        res.json(incTicket))
      .catch((err) => res.json(err));
  },

  delete: (req, res) => {
    Incident_Ticket.deleteIncTicket(req.params.id)
      .then(() => res.json({ msg: `Incident ticket berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  update: (req, res) => {
    Incident_Ticket.updateIncTicket(req.body, req.params.id)
      .then(() => res.json({ msg: "Update data request ticket berhasil" }))
      .catch((err) => res.json(err));
  },

  getById: (req, res) => {
    Incident_Ticket.getIncTicketById(req.params.id)
      .then((incTicket) => res.json(incTicket))
      .catch((err) => res.json(err));
  },

  incidentTicketPage: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    const notif = await Notification.findAll();
    res.render('pages/pegawai/incident', {page_name: "Ticket Pegawai Incident", users: req.user, incTicket: incTicket, notif: notif});
  },

  incidentTicketDetailPegawai: async (req, res) => {
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    const pegawai = await User.findAll();
    Incident_Ticket.getIncTicketByTicketID(req.params.ticketID)
      .then((incTicket) => {
        res.render('pages/pegawai/incidentDetail', {page_name: "Ticket Pegawai Incident", users: req.user, pegawai:pegawai, incTicket: incTicket, notif: notif, message: message});
      })
      .catch((err) => res.json(err));
  },

  incidentTicketDetailDinas: async (req, res) => {
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    const pegawai = await User.findAll();
    Incident_Ticket.getIncTicketByTicketID(req.params.ticketID)
      .then((incTicket) => {
        res.render('pages/pegawai/incidentDetail', {page_name: "Ticket Dinas Incident", users: req.user, pegawai:pegawai, incTicket: incTicket, notif: notif, message: message});
      })
      .catch((err) => res.json(err));
  },

  incidentTicketDinas: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    const notif = await Notification.findAll();
    const pegawai = await User.findAll();
    res.render('pages/pegawai/incidentDinas', {page_name: "Ticket Dinas Incident", users: req.user, incTicket: incTicket, pegawai:pegawai, notif: notif});
  },

  // incidentTicketDinas: async (req, res) => {
  //   const incTicket = await Incident_Ticket.findAll();
  //   res.render('pages/dinas/incident', {users: req.user, incTicket: incTicket});
  // },

  incidentTicketList: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    const notif = await Notification.findAll();
    const pegawai = await User.findAll();
    res.render('pages/admin/incident', {page_name: "Ticket Pegawai Incident", users: req.user, incTicket: incTicket, pegawai:pegawai, notif: notif});
  },

  incidentTicketDinasAdmin: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    const notif = await Notification.findAll();
    const pegawai = await User.findAll();
    res.render('pages/admin/incidentDinas', {page_name: "Ticket Dinas Incident", users: req.user, incTicket: incTicket, pegawai:pegawai, notif: notif});
  },

  incidentTicketDetailPegawaiAdmin: async (req, res) => {
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    const pegawai = await User.findAll();
    Incident_Ticket.getIncTicketByTicketID(req.params.ticketID)
      .then((incTicket) => {
        res.render('pages/admin/incidentDetail', {page_name: "Ticket Pegawai Incident", users: req.user, incTicket: incTicket, pegawai: pegawai, notif: notif, message: message});
      })
      .catch((err) => res.json(err));
  },

  incidentTicketDetailDinasAdmin: async (req, res) => {
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    const pegawai = await User.findAll();
    Incident_Ticket.getIncTicketByTicketID(req.params.ticketID)
      .then((incTicket) => {
        res.render('pages/admin/incidentDetail', {page_name: "Ticket Dinas Incident", users: req.user, incTicket: incTicket, pegawai: pegawai, notif: notif, message: message});
      })
      .catch((err) => res.json(err));
  },

  incidentTicketCS: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    res.render('pages/cs/incidentCS', {users: req.user, incTicket: incTicket});
  },

  historyIncTicket: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    res.render('pages/pegawai/history', {users: req.user, incTicket: incTicket});
  },


};