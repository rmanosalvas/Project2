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
            type: DataTypes.STRING,

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
        },

    })

    User.associate = function (models) {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        })
    }
    return User;

}
