const {
    TE,
    to
} = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Reservation', {
        title: DataTypes.STRING,
        startDateTime: DataTypes.DATE,
        endDateTime: DataTypes.DATE,
        type: DataTypes.TINYINT
    });


   
   

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};