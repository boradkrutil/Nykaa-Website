import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiHelper from "../Commen/ApiHelper";
import Message from "../Component/MessageBox";
import Loader from "../Component/Loader";
import Rating from "../Component/Rating";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ImageZoom from "react-image-zooom";


export default function ProductDetailScreen({ cartItems, setcartItems }) {
    const { id } = useParams()
    const [Product, setProduct] = useState({})
    const [loading, setloading] = useState(false)
    const [Error, setError] = useState("")
    const [qty, setqty] = useState(1)

    let stocks = [...new Array(Product.countInStock || 0).keys()]


    const navigate = useNavigate()


    const GetProduct = async () => {
        try {
            setloading(true)
            setError("")
            const result = await apiHelper.fetchProductById(id)
            setProduct(result.data.product)
            setloading(false)
        } catch (error) {
            if (error && error.response && error.response.data && error.response.message) {
                setError(error.response.data.message)
                return
            }
            setError(error.message)

            setloading(false)
        }
    }


    useEffect(() => {
        GetProduct()
        // eslint-disable-next-line
    }, [])

    const cartHandler = () => {
        let isExistIndex = cartItems.findIndex((x) => x.proid === id)
        if (isExistIndex > -1) {
            cartItems[isExistIndex].qty = qty
            setcartItems((state) => [...state])
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            
        } else {
            cartItems.push({qty:qty, proid:id})
            setcartItems((state) => [...state])
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            setcartItems(cartItems)
        }
        navigate("/cart")
      
    }



    return (
        <>
            {
                Error ? <Message>
                    {Error}
                </Message> :
                    <div className="px-3">
                        <Loader loading={loading} />
                        <div className="container">
                        <Link to={".."} >Back to result</Link>
                        </div>

                        {

                            <div className="container my-5">
                                <div className="row details-snippet1">
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-2 mini-preview d-none d-md-block ">
                                                <Zoom>
                                                <img className="img-fluid" src={Product.image} alt="Preview" width="500"></img>
                                                </Zoom>
                                                <Zoom>
                                                <img className="img-fluid" src={Product.image1} alt="Preview" width="500"></img>
                                                </Zoom>
                                                <Zoom>
                                                <img className="img-fluid" src={Product.image2} alt="Preview" width="500"></img>
                                                </Zoom>
                                                <Zoom>
                                                <img className="img-fluid" src={Product.image3} alt="Preview" width="500"></img>
                                                </Zoom>
                                                <Zoom>
                                                <img className="img-fluid" src={Product.image4} alt="Preview" width="500"></img>
                                                </Zoom>                                         

                                            </div>
                                            <div className="col-md-10">
                                                <div className="product-image">
                                                {Product && Product.image ? <ImageZoom
                                                        src={Product.image}
                                                        alt="Zoom-images"
                                                        zoom="200"
                                                    /> : null}

                                                    
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-5">
                                        <div className="category"><span className="theme-text">category : </span>{Product.category}</div>
                                        <div className="category"><span className="theme-text">Brand : </span>{Product.brand}</div>

                                        <div className="title">{Product.title}</div>
                                        <div className="ratings my-2">
                                            <div className="stars d-flex">
                                                <div className="theme-text mr-2">Product Ratings: </div>
                                                &nbsp;&nbsp;<Rating rating={Product.rating} />
                                                <div className="review ml-2">{Product.numReviews} Reviews</div>
                                            </div>
                                        </div>
                                        <div className="price my-2">Price : {Product.price}.00$</div>
                                        <div className="d-flex justify-content-between">
                                            <h5>Status</h5>
                                            <h5 className={Product.countInStock > 0 ? "text-success" : "text-danger"}> {Product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</h5>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h5>Quantity</h5>
                                            <select value={qty} onChange={(e) => setqty(Number(e.target.value))} disabled={Product.countInStock <= 0}>
                                                {
                                                    stocks.map((x) => {
                                                        return <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="theme-text subtitle">Description:</div>
                                        <div className="brief-description">
                                            {Product.description}
                                        </div>



                                        <hr />
                                        <div className="row">
                                            <div className="col-md-3">
                                                {/* <input type="number" className="form-control" value="1"></input> */}
                                            </div>
                                            <div className="col-md-9"><button onClick={cartHandler} disabled={Product.countInStock <= 0} className="btn addBtn btn-block">Add to basket</button></div>
                                        </div>

                                    </div>
                                </div>
                            </div>



                        }
                    </div>

            }

        </>
    )

}
