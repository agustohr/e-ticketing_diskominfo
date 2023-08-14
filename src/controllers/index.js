const { User } = require('../../models');
const { Incident_Ticket } = require('../../models');
const { Request_Ticket } = require('../../models');
const { Notification } = require('../../models');
const { Message } = require('../../models');

module.exports = {
  index: async (req, res) => {
    res.render('landing');
  },

  login: async (req, res) => {
    res.render('pages/pegawai/login');
  },

  homeAdmin: async (req, res) => {
    const pegawai = await User.findAll();
    const incidentTicket = await Incident_Ticket.findAll();
    const requestTicket = await Request_Ticket.findAll();
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    res.render('pages/admin/home', {page_name: "Home", users: req.user, pegawai: pegawai, incidentTicket: incidentTicket, requestTicket: requestTicket, message: message, notif: notif});
  },

  homePegawai: async (req, res) => {
    const pegawai = await User.findAll();
    const incidentTicket = await Incident_Ticket.findAll();
    const requestTicket = await Request_Ticket.findAll();
    const notif = await Notification.findAll();
    const message = await Message.findAll();
    res.render('pages/pegawai/home', {page_name: "Home", users: req.user, pegawai: pegawai, incidentTicket: incidentTicket, requestTicket: requestTicket, message: message, notif: notif});
  },
  
  api: require('./api'),
}