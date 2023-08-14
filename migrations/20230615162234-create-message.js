'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_ticket: {
        type: Sequelize.STRING
      },
      sender_role: {
        type: Sequelize.STRING
      },
      sender_nip: {
        type: Sequelize.STRING
      },
      sender_name: {
        type: Sequelize.STRING
      },
      receiver_role: {
        type: Sequelize.STRING
      },
      receiver_nip: {
        type: Sequelize.STRING
      },
      receiver_name: {
        type: Sequelize.STRING
      },
      text: {
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
    await queryInterface.dropTable('Messages');
  }
};