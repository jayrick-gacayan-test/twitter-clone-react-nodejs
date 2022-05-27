'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany( models.Tweet, {
        foreignKey: 'userId',
        as: 'users',
      } );
    }
  }
  
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required."
        },
        notEmpty: {
          msg: "Please provide an email."
        },
        isEmail: {
          msg: "Invalid email format."
        },
        isUnique(value, next){
          User.findOne({ where : { email : value } })
          .then((user) => {
            if(user) next(new Error('Email address already in use!'));

            next();
          });
        }
      },
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "Please provide a password."
        },
        len: {
          args: [8],
          msg: "Password must have at least 8 characters."
        },
        notNull:{ 
          msg: "Password is required."
        }
        
        
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    cfpswd: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Confirm password is required."
        },
        notEmpty: {
          msg: "Confirm password must not be empty"
        },
        passwordMatch(value){
          if(value !== this.password)
            throw new Error("Password and confirm password must match.")
        }
      }
    }
  },{
    
    hooks: {
      beforeCreate: (User) => {
        User.password = bcrypt.hashSync(User.password, 10);
      },
      
    },
    
    sequelize,
    timestamps: true,
    modelName: 'User',
  });

  User.validPassword = (password) => {
    return password = this.password;
  }
  return User;
};

