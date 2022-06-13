'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Follow.belongsTo(models.User,
        {
          foreignKey: "follower",
          as: "userFollowing"
        });
      
      Follow.belongsTo(models.User, {
        foreignKey: "following",
        as: "userFollower"
      });
    }
  }
  Follow.init({
    isFollowed: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: false,
    tableName: 'follows',
    modelName: 'Follow',
  });

  return Follow;
};