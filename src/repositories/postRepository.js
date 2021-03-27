const logger = require("../loaders/logger/index");
const sequelize = require("../loaders/db/db");

class PostRepository {
  constructor() {}

  async allPosts() {
    try {
      const response = await sequelize.Post.findAll({
        order: [["createdAt", "DESC"]],
        attributes: ["id", "title", "image", "createdAt", "cat_id"],
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
  async getPost(id) {
    try {
      const response = await sequelize.Post.findByPk(id, {
        attributes: ["id", "title", "content", "image", "createdAt", "cat_id"],
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
  async createPost(body) {
    const post = await sequelize.Post.create({
      raw: true,
      title: body.title,
      content: body.content,
      image: body.image,
      cat_id: body.category,
    });
    return post;
  }
}
module.exports = PostRepository;
