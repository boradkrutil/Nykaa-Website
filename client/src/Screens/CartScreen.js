import { useEffect, useState } from "react"
import apiHelper from "../Commen/ApiHelper"
import Message from "../Component/MessageBox"
import Loader from "../Component/Loader"
import { Link } from "react-router-dom"

export default function CartScreen({ cartItems, setcartItems }) {

    const [Cart, setCart] = useState([])
    const [loading, setloading] = useState(false)
    const [Error, setError] = useState("")
    const [SubTotalDetails, setSubTotalDetails] = useState({
        totalPrice: 0,
        totalItems: 0,
        totalProduct: 0
    })

    async function GetCart() {
        try {
            setloading(true)
            let proid = cartItems.map((x) => x.proid)
            const result = await apiHelper.FetchCart(proid)
            let FilterCart = result?.data?.product?.filter((x) => x.countInStock > 0)
            let i = 0
            while (i < FilterCart.length) {
                let j = 0
                while (j < cartItems.length) {
                    if (cartItems[j].proid === FilterCart[i]._id) {
                        FilterCart[i].qty = cartItems[j].qty
                    }
                    j++
                }
                i++
            }
            setCart(FilterCart)
            setloading(false)
        } catch (error) {
            setloading(false)
            if (error && error.response && error.response.data && error.response.message)
                setError(error.response.data.message)
            return
        }
    }

    useEffect(() => {
        GetCart()    
       // eslint-disable-next-line 
    }, [cartItems])

   useEffect(() => {
    let totalProduct = 0
    let totalItems = 0
    let totalPrice = 0
    let i = 0
    while (i<Cart.length) {
        totalProduct++
        totalItems += Cart[i].qty
        let price = Cart[i].price * Cart[i].qty
        totalPrice += price
        i++
    }
    setSubTotalDetails({totalItems, totalPrice, totalProduct})

   },[Cart])


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
                        <div className="h-100 gradient-custom">
                            <div className="container py-5">
                                <div className="row d-flex justify-content-center my-4">
                                    <div className="col-md-8">
                                        <div className="card mb-4">
                                            <div className="card-header py-3">
                                                <h5 className="mb-0">Cart Items</h5>
                                            </div>
                                            <div className="card-body">
                                                {
                                                    Cart && Cart.map((x, index) => {
                                                        return (
                                                            <div key={x._id} className="row">
                                                                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                                    {/* Image */}
                                                                    <Link to={`/product/${x._id}`}>
                                                                        <div
                                                                            className="bg-image hover-overlay hover-zoom ripple rounded"
                                                                            data-mdb-ripple-color="light"
                                                                        >
                                                                            <img
                                                                                src={x.image}
                                                                                className="w-100"
                                                                                alt={x.title}
                                                                            />
                                                                           
                                                                        </div>
                                                                    </Link>
                                                                    {/* Image */}
                                                                </div>
                                                                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                                    {/* Data */}
                                                                    <p>
                                                                        <Link to={".."}><strong>{x.title}</strong></Link>

                                                                    </p>
                                                                    <p>Brand: <strong>{x.brand}</strong></p>
                                                                    <p>category: <strong>{x.category}</strong></p>
                                                                    <p>
                                                                      Qty: <strong>{x.qty}</strong>
                                                                    </p>

                                                                    <p></p>
                                                                    <button
                                                                        type="button"
                                                                        className="btn  btn-sm me-1 mb-2"
                                                                        data-mdb-toggle="tooltip"
                                                                        title="Remove item"
                                                                        onClick={() => {
                                                                            let filter = cartItems.filter(item => item.proid !== x._id)
                                                                            localStorage.setItem("cartItems", JSON.stringify(filter))
                                                                            setcartItems(filter)
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-trash" />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger btn-sm mb-2"
                                                                        data-mdb-toggle="tooltip"
                                                                        title="Move to the wish list"
                                                                    >
                                                                        <i className="fas fa-heart" />
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                                    <div className="d-flex mb-4" style={{ maxWidth: 300 }}>

                                                                        <div className="form-outline">

                                                                            <label className="form-label" htmlFor="form1">
                                                                                Quantity
                                                                            </label>

                                                                            <select disabled={x.countInStock <= 0} className="bg-gradient bg-light rounded" style={{ minWidth: "70px" }} onChange={(e) => {
                                                                                Cart[index].qty = Number(e.target.value)
                                                                                setCart([...Cart])
                                                                                let i = cartItems.findIndex((item) => item.proid === x._id)
                                                                                if (i < 0) return 
                                                                                cartItems[i].qty = Number(e.target.value)
                                                                                localStorage.setItem("cartItems", JSON.stringify(cartItems))
                                                                                setcartItems((s) => s)
                                                                            }}>
                                                                                {
                                                                                    [...new Array(x.countInStock).keys()].map((n) => (
                                                                                       <option value={n+1} key={n+1}>{n+1}</option>
                                                                                    ))
                                                                                }

                                                                            </select>
                                                                        </div>

                                                                    </div>
                                                                    
                                                                    <p className="text-start text-md-center">
                                                                        Price: <strong>${x.price}.00</strong>
                                                                    </p>
                                                                    
                                                                </div>
                                                                <hr className="my-4" />
                                                            </div>


                                                        )
                                                    })
                                                }


                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card mb-4">
                                            <div className="card-header py-3">
                                                <h5 className="mb-0">Summary</h5>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                        Products :
                                                        <span><strong>{Number(SubTotalDetails.totalProduct)}</strong></span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                        Items :
                                                        <span><strong>{Number(SubTotalDetails.totalItems)}</strong></span>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                        <div>
                                                            <strong>Total amount</strong>
                                                            <strong>
                                                                <p className="mb-0">(including GST)</p>
                                                            </strong>
                                                        </div>
                                                        <span>
                                                            <strong>${Number(SubTotalDetails.totalPrice)}.00</strong>
                                                        </span>
                                                    </li>
                                                </ul>
                                                <button type="button" className="btn  btn-lg btn-block">
                                                    Go to checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="card mb-4">
                                    <div className="card-body">
                                        <p>
                                            <strong>Expected shipping delivery</strong>
                                        </p>
                                        <p className="mb-0">12.10.2023 - 14.10.2023</p>
                                    </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                    <div className="card-body">
                                        <p>
                                            <strong>We accept</strong>
                                        </p>
                                        <img
                                            className="me-2"
                                            width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                            alt="Visa"
                                        />
                                        <img
                                            className="me-2"
                                            width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                            alt="American Express"
                                        />
                                        <img
                                            className="me-2"
                                            width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                            alt="Mastercard"
                                        />
                                        <img
                                            className="me-2"
                                            width="70px"
                                            src="https://static.vecteezy.com/system/resources/previews/022/100/701/original/paypal-logo-transparent-free-png.png"
                                            alt="PayPal acceptance mark"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            }
        </>

    )
}