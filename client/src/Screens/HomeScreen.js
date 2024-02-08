import { useEffect, useState } from "react"
import apiHelper from "../Commen/ApiHelper"
import ProductCard from "../Component/ProductCard"
import Loader from "../Component/Loader"
import Message from "../Component/MessageBox"


export default function HomeScreen() {

  const [products, setproducts] = useState([])
  const [loading, setloading] = useState(false)
  const [Error, setError] = useState("")



  const GetProducts = async () => {
    try {
      setloading(true)
      setError("")
      let result = await apiHelper.fetchProduct()
      setproducts(result.data.products)
      setloading(false)

    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
        return
      }
      setError(error.message)
      setloading(false)
    }
  }


  useEffect(() => {
    GetProducts()
  }, [])



  return Error ? <Message>
    {Error}
  </Message> : (
    <>
      <Loader loading={loading} />
      <div className="container text-center">
      
        <h2>Product Card</h2>
        <hr />
        <div className="row d-flex flex-warp">

          {
            products.map((product) => {
              return <ProductCard key={product._id} product={product} />
            })
          }


        </div>
      </div>
    </>
  )
}