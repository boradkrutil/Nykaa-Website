import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function ProductCard({product}) {

  
  return (

    

    <Link  to = {`/product/${product._id}`}>
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
      <div className="wsk-cp-product">
        <div className="wsk-cp-img">
          <img
            src={product.image}
            alt={product.title}
            className="img-responsive"
          />
        </div>
        <div className="wsk-cp-text">
          <div className="category">
            <span>{product.brand}</span>
          </div>
          <div className="title-product">
            <h3>{product.title}</h3>
          </div>
          <div className="d-flex gap-1 align-items-center mb-2">
             <Rating rating={product.rating}/>
            <span className='text-dark'>
              {product.numReviews} Reviews
            </span>
  
          </div>
          {/* <div className="description-prod">
            <p>
            L'Oreal Professionnel Absolut Repair Hair Mask For Dry and Damaged Hair
            </p>
          </div> */}
          <div className="card-footer">
            <div className="wcf-left">
              <span className="price">${product.price}.00</span>
            </div>
            <div className="wcf-right">
              <span className="buy-btn" >
                <i className="fa-solid fa-cart-shopping buy-btn" style={{color:"#000"}}></i>
              </span>


            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  )
}
