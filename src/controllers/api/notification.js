const { Notification } = require('../../../models');
const { Dinas } = require('../../../models');

module.exports = {

  getAll: (req, res) => {
    Notification.findAll()
      .then((notif) => res.json(notif))
      .catch((err) => res.json(err));
  },

  add: (req, res) => {
    Notification.addNotification(req.body)
      .then((notif) =>
        res.json(notif))
      .catch((err) => res.json(err));
  },

  delete: (req, res) => {
    Notification.deleteNotification(req.params.id)
      .then(() => res.json({ msg: `Notification ticket berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  update: (req, res) => {
    Notification.updateNotification(req.body, req.params.id)
      .then(() => res.json({ msg: "Update data Notification berhasil" }))
      .catch((err) => res.json(err));
  },

  getById: (req, res) => {
    Notification.getNotificationById(req.params.id)
      .then((notif) => res.json(notif))
      .catch((err) => res.json(err));
  },

  messageListCS: async (req, res) => {
    const message = await Notification.findAll();
    res.render('pages/cs/message', {users: req.user, message: message});
  },

  messageListPegawai: async (req, res) => {
    const message = await Notification.findAll();
    res.render('pages/pegawai/message', {users: req.user, message: message});
  },

  messageListAdmin: async (req, res) => {
    const message = await Notification.findAll();
    res.render('pages/admin/message', {users: req.user, message: message});
  },

};