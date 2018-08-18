const {
    TE,
    to
} = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Resource', {
        name: DataTypes.CHAR(20),
        description: DataTypes.STRING,
        maxReservationTime: DataTypes.SMALLINT,
        minReservationTime: DataTypes.SMALLINT,
        displayOrder: DataTypes.SMALLINT
    });


    Model.associate = function (models) {
        this.Facilities = this.belongsTo(models.Facility);
        this.Reservations = this.hasMany(models.Reservation);
    };

   

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};