'use strict';
module.exports = (sequelize, DataTypes) => {
  var trail = sequelize.define('trail', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    description: DataTypes.TEXT,
    directions: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  });
    trail.associate = function(models) {
      models.trail.belongsTo(models.user);
    };
  return trail;
};
