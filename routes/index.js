const express = require('express');
const productRouter = require("./products");

const router = express.Router();

router.use("/products", productRouter);

module.exports = router;