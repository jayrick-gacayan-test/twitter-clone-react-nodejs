'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      isLiked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      tweetId: {
        type: Sequelize.INTEGER,
        references: {
           model: "tweets",
           key: "id",
           as: "tweetId"
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
           model: "users",
           key: "id",
           as: "userId"
        }
      }
    },
    {
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
  }
};