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

