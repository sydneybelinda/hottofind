"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      from_username: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      to_username: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      message_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      subject: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      read: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
    }
  );
  Message.associate = function(models) {
    Message.hasMany(models.MessageFile, {
      foreignKey: "messageId",
      as: "files",
      onDelete: "CASCADE"
    });

  Message.belongsTo(models.User, {
      foreignKey: "id",
      as: "user",
      onDelete: "CASCADE"
    });
  };
  return Message;
};
