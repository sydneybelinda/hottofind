"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../dbconfig.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.User = sequelize.import(process.cwd() + "/src/models/user.js");
db.Category = sequelize.import(process.cwd() + "/src/models/category.js");
db.Post = sequelize.import(process.cwd() + "/src/models/post.js");
db.File = sequelize.import(process.cwd() + "/src/models/file.js");
db.City = sequelize.import(process.cwd() + "/src/models/city.js");
db.Message = sequelize.import(process.cwd() + "/src/models/message.js");
db.MessageFile = sequelize.import(process.cwd() + "/src/models/messagefile.js");

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
