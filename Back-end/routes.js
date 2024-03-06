//routes.js

const express = require("express");
const router = express.Router();
const { getProduct } = require("./databaseQueries");
const { newProduct } = require("./databaseQueries");

router.get("/", function(req, res, next) {
  console.log("Router Working");
  res.sendFile("/test.html");
});

router.get("/products", async (req, res) => {
  try {
    const products = await getProduct();
    res.json(products);
  } catch (error) {
    console.error("Error executing SQL query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/products", async (req, res) => {
  try {
    // Extraction des données du produit de la requête
    const { product_name, price, product_description } = req.body;

    // Appel de la fonction newProduct en lien avec la db
    await newProduct(product_name, price, product_description);

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error executing SQL query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;