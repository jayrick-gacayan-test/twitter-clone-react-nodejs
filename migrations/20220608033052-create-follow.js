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
      isFollowed: {
        type: Sequelize.BOOLEAN,  
        allowNull: false,
        defaultValue: false
      },
      follower: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
          as: "follower"
        }
      },
      following: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
          as: "following"
        }
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