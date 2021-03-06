const express = require("express");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const config = require("../../config");
const postRoutes = require("../../routes/posts.routes");
const catRoutes = require("../../routes/categories.routes");
const logger = require("../logger");
const swaggerDocument = require("../swagger/swagger.json");
class ExpressServer {
  constructor() {
    this._db();
    this.app = express();
    this.port = config.port;
    this._middlewares();
    this._swaggerConfig();
    this._routes();
    this._notFound();
    this._errorHandler();
  }

  _db() {
    require("../db/db");
  }

  _notFound() {
    this.app.use((req, res, next) => {
      const err = new Error("Not Found");
      err.code = 404;
      next(err);
    });
  }
  _errorHandler() {
    this.app.use((err, req = Request, res, next) => {
      const code = err.code || 500;
      logger.error(
        `${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      logger.error(err.stack);
      const body = {
        error: {
          code,
          message: err.message,
        },
      };
      res.status(code).json(body);
    });
  }
  _middlewares() {
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
  }

  _routes() {
    this.app.head("/status", (req, res) => {
      res.status(200).end();
    });
    this.app.use(`/posts`, postRoutes);
    this.app.use(`/categories`, catRoutes);
  }
  _swaggerConfig() {
    this.app.use(
      config.swagger.path,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }
  async start() {
    this.app.listen(this.port, (error) => {
      if (error) {
        logger.info(error);
        process.exit(1);
        return;
      }
    });
  }
}

module.exports = ExpressServer;
