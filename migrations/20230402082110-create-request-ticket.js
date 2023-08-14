'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Request_Tickets', {
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
      request_date: {
        type: Sequelize.DATE
      },
      request_process_date: {
        type: Sequelize.DATE
      },
      request_closed_date: {
        type: Sequelize.DATE
      },
      lampiran: {
        type: Sequelize.STRING
      },
      action: {
        type: Sequelize.TEXT
      },
      status: {
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
    await queryInterface.dropTable('Request_Tickets');
  }
};