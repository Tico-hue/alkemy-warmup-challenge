const express = require("express");
const sequelize = require("../loaders/db/db");
const Post = require("../models/Post");

const getAllposts = (req = Request, res = Response) => {
  sequelize.Post.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "title", "image", "createdAt", "cat_id"],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      throw err;
    });
};

const getPost = async (req = Request, res = Response) => {
  const post = await sequelize.Post.findByPk(req.params.id, {
    attributes: ["id", "title", "content", "image", "createdAt", "cat_id"],
  });
  if (post === null) {
    res.status(404).send("not Found");
  } else {
    res.status(200).json(post);
  }
};

const createPost = async (req = Request, res = Response) => {
  if (req.body.image.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)) {
    const post = await sequelize.Post.create({
      raw: true,
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      cat_id: req.body.category,
    });
    res.status(201).json(post);
  } else {
    res.status(500).send("image field must be a image url format");
  }
};

const updatePost = async (req = Request, res = Response) => {
  const postToUpdate = await sequelize.Post.findByPk(req.params.id);
  if (postToUpdate === null) {
    res.status(404).send("post Not Found");
  } else {
    if (req.body.image.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)) {
      const result = await sequelize.Post.update(
        {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
          cat_id: req.body.category,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(result);
    } else {
      res.status(500).send("image field must be a image url format");
    }
  }
};

const deletePost = async (req = Request, res = Response) => {
  const postToDelete = await sequelize.Post.findByPk(req.params.id);
  if (postToDelete === null) {
    res.status(404).send("post Not Found");
  } else {
    sequelize.Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result, error) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result);
    });
  }
};

module.exports = {
  getAllposts,
  createPost,
  updatePost,
  getPost,
  deletePost,
};
