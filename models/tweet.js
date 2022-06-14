'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tweet.belongsTo(models.User,{
        foreignKey: 'userId',
        as: "user",
      });

      Tweet.hasMany(models.Like,{
        foreignKey: "tweetId",
        as: "likes"
      });

      Tweet.hasMany(models.Comment, {
        foreignKey: "tweetId",
        as: "comments"
      });
    }
  }
  Tweet.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    tableName: "tweets",
    timestamps: true,
    modelName: 'Tweet',
  });
  
  return Tweet;
};