'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Request_Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    //fungsi untuk menambahkan ReqTicket
    static addReqTicket({ no_ticket, type, category, deskripsi, nip_pegawai, request_date, request_process_date, request_closed_date, lampiran, action, status }){
      return this.create({ 
        ticketID: uuidv4(),
        no_ticket: no_ticket,
        type: type,
        category: category, 
        deskripsi: deskripsi,
        nip_pegawai: nip_pegawai, 
        request_date: request_date, 
        request_process_date: request_process_date,
        request_closed_date: request_closed_date,
        lampiran: lampiran,
        action: action,
        status: status }); 
    }

    //fungsi untuk delete ReqTicket
    static deleteReqTicket(id){
      return this.destroy({ where: { id: id } })
    }

    //fungsi untuk update ReqTicket
    static updateReqTicket({ ticketID, no_ticket, type, category, deskripsi, nip_pegawai, request_date, request_process_date, request_closed_date, lampiran, action, status },id){
      return this.update({ 
        ticketID: ticketID,
        no_ticket: no_ticket,
        type: type,
        category: category, 
        deskripsi: deskripsi,
        nip_pegawai: nip_pegawai, 
        request_date: request_date, 
        request_process_date: request_process_date,
        request_closed_date: request_closed_date,
        lampiran: lampiran,
        action: action,
        status: status }, { where:{id: id} })
    }

    //fungsi untuk mengambil data ReqTicket berdasarkan id
    static getReqTicketById(id){
      return this.findOne({ where: { id: id } });
    }

    static getReqTicketByTicketID(ticketID){
      return this.findOne({ where: { ticketID: ticketID } });
    }

  }
  Request_Ticket.init({
    ticketID: DataTypes.STRING,
    no_ticket: DataTypes.STRING,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    nip_pegawai: DataTypes.STRING,
    request_date: DataTypes.STRING,
    request_process_date: DataTypes.DATE,
    request_closed_date: DataTypes.DATE,
    lampiran: DataTypes.STRING,
    action: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request_Ticket',
  });
  return Request_Ticket;
};