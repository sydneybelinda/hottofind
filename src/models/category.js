"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      maincategory: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      subcategory: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      catindex: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      keyindex: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
  Category.associate = function(models) {
    // associations can be defined here
  }
  return Category;
};
