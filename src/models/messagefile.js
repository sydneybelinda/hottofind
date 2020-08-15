"use strict";
module.exports = (sequelize, DataTypes) => {
  const MessageFile = sequelize.define(
    "messagefile",
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      originalname: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      owner: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      messageId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );
  MessageFile.associate = function(models) {
    MessageFile.belongsTo(models.Message, {
      foreignKey: "id",
      as: "message",
      onDelete: "CASCADE"
    });
  };
  return MessageFile;
};
