const express = require("express");

const getAllUsers = (req = Request, res = Response) => {
  const users = [{ id: 1, name: "tico" }];
  res.json(users);
};

module.exports = {
  getAllUsers,
};
