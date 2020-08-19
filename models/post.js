// module.exports = function (sequelize, DataTypes) {
    {}
    let Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter a title for your date idea"
                }
            }
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: "Date"
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter a date location"
                }
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter your date idea"
                }
            }
        },
        date: {
            type: DataTypes.DATE,
        }
    });

    Post.associate = function (models) {

        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};