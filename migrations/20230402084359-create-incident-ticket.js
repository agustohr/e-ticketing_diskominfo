'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Incident_Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticketID: {
        type: Sequelize.STRING
      },
      no_ticket: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      nip_pegawai: {
        type: Sequelize.STRING
      },
      incident_date: {
        type: Sequelize.DATE
      },
      incident_process_date: {
        type: Sequelize.DATE
      },
      incident_closed_date: {
        type: Sequelize.DATE
      },
      root_cause: {
        type: Sequelize.TEXT
      },
      action: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
      },
      lampiran: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Incident_Tickets');
  }
};