const express = require("express");
const { addOrModifyCart, modifyCart } = require("../services/cartService");

const router = express.Router();

router.get("/", async (req, res, next) => {
  if (!req.session?.cart) {
    req.session.cart = [];
  }
  return res.json(200, req.session.cart);
});

router.post("/", async (req, res, next) => {
  if (!req.session?.cart) {
    req.session.cart = [];
  }
  const { item } = req.body;
  req.session.cart = addOrModifyCart(req.session.cart, item);
  return res.json(200, req.session.cart);
});

router.patch("/:productId", async (req, res, next) => {
  if (!req.session?.cart) {
    req.session.cart = [];
  }
  const { productId } = req.params;
  const { quantity } = req.body;
  req.session.cart = modifyCart(req.session.cart, productId, quantity);
  return res.json(200, req.session.cart);
});

module.exports = router;
