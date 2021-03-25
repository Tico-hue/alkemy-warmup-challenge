module.exports = (sequelize, type) => {
  const Category = sequelize.define("categories", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: type.STRING, unique: true, allowNull: false },
  });

  return Category;
};
