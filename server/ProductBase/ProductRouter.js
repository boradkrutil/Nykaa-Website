const express = require("express")
const productController = require("./ProductController")


const productRouter = express.Router()


productRouter.get("/insertMany", productController.insertProducts)
productRouter.get("/", productController.Getproducts)
productRouter.get("/:id", productController.FetchProductById)
productRouter.post("/cart", productController.FetchCart)





module.exports = productRouter