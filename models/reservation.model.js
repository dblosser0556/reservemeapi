const {
    TE,
    to
} = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Reservation', {
        title: DataTypes.STRING,
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        type: DataTypes.TINYINT,
        rrule: DataTypes.STRING,
        rruleStart: DataTypes.DATE,
        rruleEnd: DataTypes.DATE
    });


   
    Model.associate = function (models) {
        this.Users = this.belongsTo(models.User);
        this.Resources = this.belongsTo(models.Resource);
    };

  
    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};