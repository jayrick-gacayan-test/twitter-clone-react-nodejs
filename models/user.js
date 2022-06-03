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

    async hasEmail(){
      const user = await User.findOne({ where : { email : this.email }});
      if(user)
        return "Email has been already taken.";
      
      return null;
    }// checks existing email address...
  }
  
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email has been already taken."
      },
      validate: {
        notNull: {
          msg: "Email is required."
        },
        notEmpty: {
          msg: "Please provide an email."
        },
        isEmail: {
          msg: "Invalid email format."
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
    userImage: DataTypes.STRING,
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
        len: {
          args: [8],
          msg: "Confirm password must have at least 8 characters and matches to the password."
        },
        passwordMatch(value){
          if(value !== this.password)
            throw new Error("Password and confirm password must match.")
        }
      }
    }
  },{
    
    hooks: {
      beforeSave: (User, options) => {
        if(options.fields.includes("cfpswd"))
          User.password = bcrypt.hashSync(User.password, 10);
      },
      beforeFind : (options) => {
        //console.log("Option attributes ---- ",options);
      },
      beforeValidate:(User, options) => {
        
      },
      afterValidate: (User, options) => 
      {
        
      }
    },
    
    sequelize,
    tableName: "users",
    timestamps: true,
    modelName: 'User',
  });

  return User;
};

