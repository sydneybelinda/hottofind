"use strict";
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "city",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      countrycode: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      country: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
  City.associate = function(models) {
    // associations can be defined here
  };
  City.sync()
  .then(() => console.log("City table created successfully"))
  return City;
};
