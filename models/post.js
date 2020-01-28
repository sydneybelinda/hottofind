"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      social: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      age: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cities: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      country: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      sponsor: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      catindex: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      keyindex: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      owner: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      website: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      currency: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      price: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      firstname: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      lastname: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      facebook: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      twitter: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      linkedin: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      views: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      movedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );
  Post.associate = function(models) {
    Post.hasMany(models.File, {
      foreignKey: "postId",
      as: "files",
      onDelete: "CASCADE"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE"
    });
  };
  return Post;
};
