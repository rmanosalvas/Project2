/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your first name"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your last name"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please enter a username"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isInt: true,
        isLowerCase: true,
        isUpperCase: true,
        len: [6],
        notNull: {
          msg: "Please enter a password"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    userPref1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please at least enter this preference"
        }
      }
    },
    userPref2: {
      type: DataTypes.STRING
    },
    userPref3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    securityQuestion1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    securityQuestion2: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  User.associate = function (models) {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };
  return User;
};