'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      isLiked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      tweetId: {
        type: Sequelize.INTEGER,
        references: {
           model: "Tweets",
           key: "id",
           as: "tweetId"
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
           model: "Users",
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
    await queryInterface.dropTable('Likes');
  }
};