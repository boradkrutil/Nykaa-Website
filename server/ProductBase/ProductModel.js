const { default: mongoose, Model } = require("mongoose");

class ProductModel {
    constructor() {
        this.schema = new mongoose.Schema({
            title: { type: String, required: true },
            brand: { type: String, required: true },
            category: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            image1: { type: String, required: true },
            image2: { type: String, required: true },
            image3: { type: String, required: true },
            image4: { type: String, required: true },
            rating: { type: Number, required: true, default: 2 },
            countInStock: { type: Number, required: true },
            numReviews: { type: Number, required: true },

        }, { timestamps: true })

        this.tbl_product = mongoose.model("tbl_products", this.schema)

        this.tbl_innerProduct = mongoose.model("tbl_innerProducts", this.schema)



    }

    insertProduct(products) {
        return this.tbl_product.insertMany(products)
    }
   

    fetchProduct(){
        return this.tbl_product.find()
    }

    getProductById(id){
        return this.tbl_product.findById(id)
    }
    getCart(proid){
        return this.tbl_product.find({_id:proid}, {_id:true, image:true, price:true, title:true, countInStock:true, brand:true, category:true})
    }


   
}

const productModel = new ProductModel
module.exports = productModel