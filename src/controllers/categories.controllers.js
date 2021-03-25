const express = require("express");
const sequelize = require("../loaders/db/db");
const Category = require("../models/Category");

const getAllCategories = (req = Request, res = Response) => {
  sequelize.Category.findAll({
    attributes: ["id", "name"],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      throw err;
    });
};

const getCategory = async (req = Request, res = Response) => {
  const cat = await sequelize.Category.findByPk(req.params.id, {
    attributes: ["id", "name"],
  });
  if (cat === null) {
    res.status(404).send("not Found");
  } else {
    res.status(200).json(cat);
  }
};
const createCategory = async (req = Request, res = Response) => {
  const cat = await sequelize.Category.create({
    raw: true,
    name: req.body.name,
  });
  res.status(201).json(cat);
};

const updateCategory = async (req = Request, res = Response) => {
  const categoryToUpdate = await sequelize.Post.findByPk(req.params.id);
  if (categoryToUpdate === null) {
    res.status(404).send("category not found");
  } else {
    const result = await sequelize.Category.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(result);
  }
};


module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
};
