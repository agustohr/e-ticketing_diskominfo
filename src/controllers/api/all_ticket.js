const { Incident_Ticket } = require('../../../models');
const { Request_Ticket } = require('../../../models');
const { Notification } = require('../../../models');

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

  reportTicket: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    const reqTicket = await Request_Ticket.findAll();
    const notif = await Notification.findAll();
    res.render('pages/admin/report', {page_name: "Report", users: req.user, incTicket: incTicket, reqTicket: reqTicket, notif: notif});
  },

  generateThisMonth: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    const reqTicket = await Request_Ticket.findAll();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    res.render('pages/admin/generateReport', {month: month, year: year, users: req.user, incTicket: incTicket, reqTicket: reqTicket});
  },

  generateLastMonth: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    const reqTicket = await Request_Ticket.findAll();
    const month = new Date().getMonth()-1;
    const year = new Date().getFullYear();
    res.render('pages/admin/generateReport', {month: month, year: year, users: req.user, incTicket: incTicket, reqTicket: reqTicket});
  },

  generateCustomMonth: async (req, res) => {
    const incTicket = await Incident_Ticket.findAll();
    const reqTicket = await Request_Ticket.findAll();
    const month = req.body.month;
    const year = req.body.year;
    res.render('pages/admin/generateReport', {month: month, year: year, users: req.user, incTicket: incTicket, reqTicket: reqTicket});
  },


};