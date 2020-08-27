module.exports = function (sequelize, DataTypes) {
    const Match = sequelize.define("match", {
        user1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Match.associate = function (models) {
        Match.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    return Match;
};