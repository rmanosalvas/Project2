module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: "Please enter your first name"
                }
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: "Please enter your last name"
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull: {
                    msg: "Please enter a username"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
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
            isEmail: true,
            validate:{
                notNull: {
                    msg: "Please enter your email"
                }
            }
        },
        userPref1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter at least one preference"
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

    })
User.associate = function(models){
    Author.hasMany(models.Post, {
        onDelete: "cascade"
    })
}
return User;

}
