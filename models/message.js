'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    //fungsi untuk menambahkan Message
    static addMessage({ no_ticket, sender_role, sender_name, sender_nip, text, receiver_role, receiver_nip, receiver_name }){
      return this.create({ 
        no_ticket: no_ticket,
        sender_role: sender_role,
        sender_name: sender_name,
        sender_nip: sender_nip, 
        text: text,
        receiver_role: receiver_role,
        receiver_nip: receiver_nip,
        receiver_name: receiver_name }); 
    }

    //fungsi untuk delete ReqTicket
    static deleteMessage(id){
      return this.destroy({ where: { id: id } })
    }

    //fungsi untuk update Message
    static updateMessage({ no_ticket, sender_role, sender_name, sender_nip, text, receiver_role, receiver_nip, receiver_name },id){
      return this.update({ 
        no_ticket: no_ticket,
        sender_role: sender_role,
        sender_name: sender_name,
        sender_nip: sender_nip, 
        text: text,
        receiver_role: receiver_role,
        receiver_nip: receiver_nip,
        receiver_name: receiver_name }, { where:{id: id} })
    }

    //fungsi untuk mengambil data Message berdasarkan id
    static getMessageById(id){
      return this.findOne({ where: { id: id } });
    }

  }
  Message.init({
    no_ticket: DataTypes.STRING,
    sender_role: DataTypes.STRING,
    sender_nip: DataTypes.STRING,
    sender_name: DataTypes.STRING,
    receiver_role: DataTypes.STRING,
    receiver_nip: DataTypes.STRING,
    receiver_name: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};