'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('follows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      follower: {
        type: Sequelize.INTEGER,
      },
      following: {
        type: Sequelize.INTEGER
      },
    },
    {
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('follows');
  }
};