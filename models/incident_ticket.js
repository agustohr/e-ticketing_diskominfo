'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Incident_Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    //fungsi untuk menambahkan IncTicket
    static addIncTicket({ no_ticket, type, category, deskripsi, nip_pegawai, incident_date, incident_process_date, incident_closed_date, root_cause, action, status, lampiran }){
      return this.create({ 
        ticketID: uuidv4(),
        no_ticket: no_ticket,
        type: type,
        category: category, 
        deskripsi: deskripsi,
        nip_pegawai: nip_pegawai, 
        incident_date: incident_date, 
        incident_process_date: incident_process_date,
        incident_closed_date: incident_closed_date,
        root_cause: root_cause,
        action: action,
        status: status,
        lampiran: lampiran }); 
    }

    //fungsi untuk delete ReqTicket
    static deleteIncTicket(id){
      return this.destroy({ where: { id: id } })
    }

    //fungsi untuk update IncTicket
    static updateIncTicket({ ticketID, no_ticket, type, category, deskripsi, nip_pegawai, incident_date, incident_process_date, incident_closed_date, root_cause, action, status, lampiran },id){
      return this.update({ 
        ticketID: ticketID,
        no_ticket: no_ticket,
        type: type,
        category: category, 
        deskripsi: deskripsi,
        nip_pegawai: nip_pegawai, 
        incident_date: incident_date, 
        incident_process_date: incident_process_date,
        incident_closed_date: incident_closed_date,
        root_cause: root_cause,
        action: action,
        status: status,
        lampiran: lampiran }, { where:{id: id} })
    }

    //fungsi untuk mengambil data IncTicket berdasarkan id
    static getIncTicketById(id){
      return this.findOne({ where: { id: id } });
    }

    static getIncTicketByTicketID(ticketID){
      return this.findOne({ where: { ticketID: ticketID } });
    }

  }
  Incident_Ticket.init({
    ticketID: DataTypes.STRING,
    no_ticket: DataTypes.STRING,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    nip_pegawai: DataTypes.STRING,
    incident_date: DataTypes.DATE,
    incident_process_date: DataTypes.DATE,
    incident_closed_date: DataTypes.DATE,
    root_cause: DataTypes.TEXT,
    action: DataTypes.TEXT,
    status: DataTypes.STRING,
    lampiran: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Incident_Ticket',
  });
  return Incident_Ticket;
};