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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }

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


    })
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
    // User.associate = function (models) {
    //     User.hasMany(models.Post, {
    //         onDelete: "cascade"
    //     })
    // }

    return User;

}