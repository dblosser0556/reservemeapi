const {
  TE,
  to
} = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Facility', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    startHour: DataTypes.TINYINT,
    endHour: DataTypes.TINYINT
  });


  
  Model.associate = function (models) {
    this.Users = this.hasMany(models.User);
    this.UserRoles = this.hasMany(models.UserRole);
    this.Resources = this.hasMany(models.Resource);
  };

  //Model.associate = function (models) {
  //  this.Resources = this.hasMany(models.Resource);
  //};

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};