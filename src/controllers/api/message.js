const { Message } = require('../../../models');
const { Notification } = require('../../../models');
const { dinas } = require('../../../models');

module.exports = {

  getAll: (req, res) => {
    Message.findAll()
      .then((message) => res.json(message))
      .catch((err) => res.json(err));
  },

  add: (req, res) => {
    Message.addMessage(req.body)
      .then((message) =>
        res.json(message))
      .catch((err) => res.json(err));
  },

  delete: (req, res) => {
    Message.deleteMessage(req.params.id)
      .then(() => res.json({ msg: `Message ticket berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  update: (req, res) => {
    Message.updateMessage(req.body, req.params.id)
      .then(() => res.json({ msg: "Update data message berhasil" }))
      .catch((err) => res.json(err));
  },

  getById: (req, res) => {
    Message.getMessageById(req.params.id)
      .then((message) => res.json(message))
      .catch((err) => res.json(err));
  },

  messageListCS: async (req, res) => {
    const message = await Message.findAll();
    res.render('pages/cs/message', {users: req.user, message: message});
  },

  messageListPegawai: async (req, res) => {
    const message = await Message.findAll();
    const notif = await Notification.findAll();
    const seedinas = await dinas.findAll();
    res.render('pages/pegawai_old/message', {users: req.user, notif: notif, message: message, seedinas:seedinas});
  },

  messageListAdmin: async (req, res) => {
    const message = await Message.findAll();
    const notif = await Notification.findAll();
    res.render('pages/admin/message', {users: req.user, notif: notif, message: message});
  },

};