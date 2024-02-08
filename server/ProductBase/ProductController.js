const productModel = require("./ProductModel")


const data = [
    {
        title: "Colorbar Waterproof Liquid Eyeliner",
        brand: "Lakme",
        category: "Women",
        description: "With a flexible felt tip applicator, Colorbar Precision Waterproof Eyeliner defines your eyes through thick and thin. The quick-drying, waterproof formula remains flawlessly intense without smudging, flaking or cracking.",
        price: 340,
        image: "https://images-static.nykaa.com/media/catalog/product/0/6/066c973N_8904052432975_1.jpg",
        image1: "https://images-static.nykaa.com/media/catalog/product/0/6/066c973N_8904052432975_4.jpg",
        image2: "https://images-static.nykaa.com/media/catalog/product/0/6/066c973N_8904052432975_5.jpg",
        image3: "https://images-static.nykaa.com/media/catalog/product/0/6/066c973N_8904052432975_6.jpg",
        image4: "https://images-static.nykaa.com/media/catalog/product/0/6/066c973N_8904052432975_7.jpg",
        rating: 4,
        countInStock: 20,
        numReviews: 10,
    },
    {
        title: "Kay Beauty Nail Nourish Nail Enamel Polish - Tender Lavender 09",
        brand: "Kay",
        category: "Women",
        description: "Kay Beauty Nail Nourish Nail Lacquer is a unique nail enamel that not just coats your nails in a luxurious, lustrous shine but the treatment-nourished formula also helps keep your nails happy and hydrated.",
        price: 207,
        image: "https://images-static.nykaa.com/media/catalog/product/d/c/dcf94e88904330901087_1.jpg",
        image1: "https://images-static.nykaa.com/media/catalog/product/d/c/dcf94e88904330901087_2.jpg",
        image2: "https://images-static.nykaa.com/media/catalog/product/d/c/dcf94e88904330901087_3.jpg",
        image3: "https://images-static.nykaa.com/media/catalog/product/d/c/dcf94e88904330901087_4.jpg",
        image4: "https://images-static.nykaa.com/media/catalog/product/d/c/dcf94e88904330901087_5.jpg",
        rating: 3.4,
        countInStock: 25,
        numReviews: 20
    },
    {
        title: "Benefit Cosmetics BADgal Bang! Mascara Mini",
        brand: "Benefit ",
        category: "Women",
        description: "BADgal BANG! 36 Hour* Full-Blast volumizing mascara creates massive volume without weighing down lashes. The gravity-defying formula contains aero-particles, one of the lightest known materials, derived from space technology. ",
        price: 1340,
        image: "https://images-static.nykaa.com/media/catalog/product/1/8/18e24b08904245710958_1.jpg",
        image1: "https://images-static.nykaa.com/media/catalog/product/b/a/badgalbang_mini_vial_closed.jpg",
        image2: "https://images-static.nykaa.com/media/catalog/product/b/a/badgalbang_mini_uc_b.jpg",
        image3: "https://images-static.nykaa.com/media/catalog/product/6/0/602004087867_3_1.jpg",
        image4: "https://images-static.nykaa.com/media/catalog/product/6/0/602004089557.jpg",
        rating: 4.5,
        countInStock: 30,
        numReviews: 15,
    },

    {
        title: "Love Earth Multipot-Be The Change Lip Tint with Jojoba Oil and Vitamin E for Lips Eyelids & Cheeks",
        brand: "Love Earth",
        category: "Women",
        description: "Love Earth Multipot-Be The Change is a multipurpose product that works as a tint and moisturizes your lips as well. It has nourishing and hydrating properties as well. It can be used on your lips, cheeks and eyelids for a flush of colour. ",
        price: 299,
        image: "https://images-static.nykaa.com/media/catalog/product/4/f/4f069ea0LOVEE00000005_1.jpg",
        image1: "https://images-static.nykaa.com/media/catalog/product/4/f/4f069ea0LOVEE00000005_2.jpg",
        image2: "https://images-static.nykaa.com/media/catalog/product/4/f/4f069ea0LOVEE00000005_4.jpg",
        image3: "https://images-static.nykaa.com/media/catalog/product/4/f/4f069ea0LOVEE00000005_5.jpg",
        image4: "https://images-static.nykaa.com/media/consc/clean_vegan.jpg",
        rating: 4.5,
        countInStock: 30,
        numReviews: 45
    },
    {
        title: "Makeup Revolution Mousse Blusher - Blossom Rose Pink",
        brand: "Revolution",
        category: "Women",
        description: "Dreamy, creamy colour for cheeks and eyes! Achieve soft focus skin with a creamy whipped mousse formula. This is the Y2K beauty throwback we've all been waiting for! Level up your look with this dreamy, light-as-air mousse blusher with a cream-to-powder finish, delivering buildable colour for a tailored flush.",
        price: 536,
        image: "https://images-static.nykaa.com/media/catalog/product/2/7/27e15bdMAKEU00000852_1.jpg",
        image1: "https://images-static.nykaa.com/media/catalog/product/2/7/27e15bdMAKEU00000852_2.jpg",
        image2: "https://images-static.nykaa.com/media/catalog/product/2/7/27e15bdMAKEU00000852_2.jpg",
        image3: "https://images-static.nykaa.com/media/catalog/product/2/7/27e15bdMAKEU00000852_6.jpg",
        image4: "https://images-static.nykaa.com/media/catalog/product/2/7/27e15bdMAKEU00000852_8.jpg",
        rating: 5,
        countInStock: 50,
        numReviews: 40
    }
]


class ProductController {

    async insertProducts(req, res) {
        try {
            const result = await productModel.insertProduct(data)
            if (result) {
                return res.status(200).send({ message: "Success", product: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })

        }
    }

   

    async Getproducts(req, res) {
        try {
            const result = await productModel.fetchProduct()
            if (result && result.length > 0) return res.status(200).send({ message: "Success", products: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })

        }
    }

   

    async FetchProductById(req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send({ message: "Missing dependency Id" })

            const result = await productModel.getProductById(id)
            if (result) return res.status(200).send({ message: "Success", product: result })
            return res.status(500).send({ message: "Somthing went wrong" })

        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })

        }
    }

   

    async FetchCart(req, res) {
        try {
            const { proid } = req.body;
            if (!proid) {
                return res.status(400).send({ message: "Missing dependency products" })
            }
            const result = await productModel.getCart(proid)
            if (result) return res.status(200).send({ message: "Success", product: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" })

        }
    }




}

const productController = new ProductController
module.exports = productController