'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.Tweet, {
        foreignKey: "tweetId",
        as: "tweet"
      });

      Like.belongsTo(models.User, {
        as: "user",
        foreignKey: 'userId'
      });
    }
  }
  Like.init({
    isLiked: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: "likes",
    timestamps: false,
    modelName: 'Like',
  });

  Like.removeAttribute("id");
  return Like;
};