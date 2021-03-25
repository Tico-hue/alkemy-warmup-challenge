const { Sequelize } = require("sequelize");
const posts = require("../../models/Post");
const categories = require("../../models/Category");
const config = require("../../config");
const logger = require("../logger");

const sequelize = new Sequelize("alkemy_warmup", "root", "rootroot", {
  host: config.host,
  dialect: "mysql",
  dialectOptions: { decimalNumbers: true },
});

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established");
  })
  .catch((err) => {
    logger.error("Unable to connecto to db");
  });

const Post = posts(sequelize, Sequelize);
const Category = categories(sequelize, Sequelize);
Post.associate(Category);

sequelize.sync({ force: false }).then(() => {
  logger.info("synchronized");
});

module.exports = {
  Post,
  Category,
  sequelize,
};
