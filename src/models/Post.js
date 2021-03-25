module.exports = (sequelize, type) => {
  const Post = sequelize.define("posts", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: type.STRING,
    content: type.STRING,
    image: type.STRING,
  });
  Post.associate = (models) => {
    Post.belongsTo(models, {
      foreignKey: "cat_id",
      onDelete: "cascade",
    });
  };
  return Post;
};
