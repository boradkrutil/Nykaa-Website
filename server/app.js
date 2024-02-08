const express = require("express")
const ConnectDb = require("./Connection")
const productRouter = require("./ProductBase/ProductRouter")
const cors = require("cors")
const dotenv = require("dotenv")
const UserRouter = require("./User/UsreRouter")
dotenv.config()


const app = express()

ConnectDb()

app.use(cors())
app.use(express.json())

app.use("/api/product", productRouter)
app.use("/api", UserRouter)



app.get("/", (req, res) => {
  return res.status(200).send({ message: "Success" })
})

app.listen(5500, () => {
  console.log("server");
})

