const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        
        userPref1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPref2: {
            type: DataTypes.STRING,

        },
        userPref3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        aboutMe1: {
            type: DataTypes.STRING
        },
        aboutMe2: {
            type: DataTypes.STRING
        },
        aboutMe3: {
            type: DataTypes.STRING
        },
        securityQuestion1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        securityQuestion2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isEmail: true
        //     }
        // },

    })

    User.associate = function (models) {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        })
    }
    return User;

}