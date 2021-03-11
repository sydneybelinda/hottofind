"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          is: /^[a-z0-9\_\-]+$/i,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mustChangePassword: {
        type: DataTypes.CHAR,
        allowNull: true,
      },
      profilesId: {
        type: DataTypes.CHAR,
        allowNull: true,
      },
      banned: {
        type: DataTypes.CHAR,
        allowNull: true,
      },
      suspended: {
        type: DataTypes.CHAR,
        allowNull: true,
      },
      active: {
        type: DataTypes.CHAR,
        allowNull: true,
      },
      passwordreset: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
    },
    {
      timestamps: false,
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };

  User.sync()
    .then(() => console.log("User table created successfully"))
    .catch((err) =>
      console.log("BTW, did you enter wrong database credentials?")
    );

  return User;
};
