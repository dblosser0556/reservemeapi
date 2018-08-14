const {
    TE,
    to
} = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('UserRole', {
        name: DataTypes.STRING,
        maxReservationPeriod: DataTypes.SMALLINT,
        maxReservationsPerDay: DataTypes.SMALLINT,
        maxReservationsPerPeriod: DataTypes.SMALLINT
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