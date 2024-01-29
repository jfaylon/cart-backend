const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { offset = 0, limit = 0 } = req.query;

  const { data: productData } = await axios.get(
    "https://fakestoreapi.com/products"
  );
  const parsedOffset = Number.parseInt(offset);
  const parsedLimit = Number.parseInt(limit);
  let filteredData = productData;
  if (limit > 0) {
    filteredData = productData.slice(parsedOffset, parsedLimit + parsedOffset);
  }

  return res.status(200).send({
    products: filteredData,
  });
});

router.get("/categories", async (req, res, next) => {
  const { data: categories } = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  return res.status(200).send({
    categories,
  });
});

router.get("/categories/:category", async (req, res, next) => {
  const { category } = req.params;
  const { data: productData } = await axios.get(
    `https://fakestoreapi.com/products/category/${category}`
  );
  return res.status(200).send({
    products: productData,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { data: productData } = await axios.get(
    `https://fakestoreapi.com/products/${id}`
  );
  return res.status(200).send(productData);
});

module.exports = router;
