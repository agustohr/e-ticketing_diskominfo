'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nip: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },
      dinas: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      status_akun_dinas: {
        type: Sequelize.STRING,
        defaultValue: 'not_registered',
      },
      surat_permohonan: {
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
    await queryInterface.dropTable('Users');
  }
};