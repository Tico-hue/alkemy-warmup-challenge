const express = require("express");
const config = require("../../config");
const routes = require("../../routes/users.routes");
const morgan = require("morgan");
const winston = require("winston");

class ExpressServer {
  constructor() {
    this.app = express();
    this.port = config.port;
    this._middlewares();
    this._routes();
  }

  _middlewares() {
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
  }

  _routes() {
    this.app.head("/status", (req, res) => {
      res.status(200).end();
    });
    this.app.use(`/users`, routes);
  }

  async start() {
    this.app.listen(this.port, (error) => {
      if (error) {
        console.log(error);
        process.exit(1);
        return;
      }
    });
  }
}

module.exports = ExpressServer;
