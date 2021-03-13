"use strict";
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    "file",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      owner: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );
  File.associate = function(models) {
    File.belongsTo(models.Post, {
      foreignKey: "id",
      as: "post",
      onDelete: "CASCADE"
    });
  };

  return File;
};
