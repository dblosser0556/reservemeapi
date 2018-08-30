const {
    TE,
    to
} = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('UserRole', {
        name: DataTypes.STRING,
        maxReservationPeriod: DataTypes.SMALLINT,
        maxReservationsPerDay: DataTypes.SMALLINT,
        maxReservationsPerPeriod: DataTypes.SMALLINT,
        isAdmin: DataTypes.BOOLEAN,
        canUserRecurring: DataTypes.BOOLEAN,
        isSuperAdmin: DataTypes.BOOLEAN
    });


    Model.associate = function (models) {
        this.Users = this.hasMany(models.User);
    };

   

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};