const express = require("express");
const ProductController = require("./controllers/ProductController");
const routes = express.Router();

routes.post("/product", ProductController.store);
routes.get("/product", ProductController.get);

module.exports = routes;
