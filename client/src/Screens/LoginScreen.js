import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Validation from "../Component/Validation"
import apiHelper from "../Commen/ApiHelper"


export default function LoginScreen({ setUserInfo, setToken }) {
  const [LoginDetails, setLoginDetails] = useState({
     email: "",
     password: "",
  })
  const [ValidationErrors, setValidationErrors] = useState([])
  const [isSubmited, setisSubmited] = useState(false)

  const navigate = useNavigate()


  const LoginHandler = async () => {
    try {
      setisSubmited(true)
      const validationResult = Validation(LoginDetails, "login")

      if (validationResult.length > 0) {
        setValidationErrors(validationResult)
        return
      }


      const result = await apiHelper.userLogin(LoginDetails)
      if (result && result.data && result.data.userinfo && result.data.token) {
        localStorage.setItem("userInfo", JSON.stringify(result.data.userinfo))
        localStorage.setItem("token", result.data.token)
        setUserInfo(result.data.userinfo)
        setToken(result.data.token)
        navigate("/")

      }

    } catch (error) {
       if (error && error.responses && error.response.status === 400) {
        setValidationErrors(error.response.data.error)
       }
    }
  }


  return (
    <div className="content">
      <div className="flex-div">
        <div className="name-content">
          <img src="https://finshiksha.com/wp-content/uploads/2022/04/Nykaa-Banner-Image.jpg" alt="" />
          <p>Nykaa sells many product-grids under its own brand names.</p>
        </div>
        <form>
          <input onChange={(e) => {
            setLoginDetails({ ...LoginDetails, email: e.target.value })
            
            if (isSubmited) {
              const validationResult = Validation({ ...LoginDetails, email: e.target.value }, "login")
            setValidationErrors(validationResult)
            }
            

          }} type="text" id="email" placeholder="Email or Phone Number" required />
          {
            ValidationErrors.find((x) => x.key === "email") ? (
              <span className="text-danger pos">
                {
                  ValidationErrors.find((x) => x.key === "email").message
                }
              </span>
            ) : ""
          }
          <input onChange={(e) => {
            setLoginDetails({ ...LoginDetails, password: e.target.value })
            if (isSubmited) {
              const validationResult = Validation({ ...LoginDetails, password: e.target.value }, "login")
            setValidationErrors(validationResult)
            }
          }} type="password" id="password" placeholder="Password" required />
          {
            ValidationErrors.find((x) => x.key === "password") ? (

              <span className="text-danger pos">
                {
                  ValidationErrors.find((x) => x.key === "password").message
                }
              </span>
            ) : ""
          }
          <button onClick={LoginHandler} className="login" type="button">Sign In</button>
          <div className="col-12 mb-3">
            <div className="d-flex gap-1 justify-content-center align-items-center">
              <hr className="d-block" style={{ width: "2rem" }} />
              <i className="fw-normal" style={{ fontSize: "1rem" }}>
                No have an Account
              </i>
              <hr className="d-block" style={{ width: "2rem" }} />
            </div>
          </div>
          <a href="##">Forgot Password ?</a>
          <hr />
          <button onClick={() => navigate("/register")} className="create-account">Create New Account</button>
        </form>
      </div>
    </div>
  )
}