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