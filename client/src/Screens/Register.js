import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Validation from "../Component/Validation"
import apiHelper from "../Commen/ApiHelper"


export default function Register({ setUserInfo, setToken }) {


    const navigate = useNavigate()

    const [registerDetails, setregisterDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [registerValidationErrors, setregisterValidationErrors] = useState([])
    const [isSubmited, setisSubmited] = useState(false)

    const RegisterHandler = async () => {
        try {
            setisSubmited(true)
            const validationResult = Validation(registerDetails, "register")

            if (validationResult.length > 0) {
                setregisterValidationErrors(validationResult)
                return
            }

            const result = await apiHelper.userRegister(registerDetails)

            if (result.data && result.data.userinfo && result.data.token) {
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("userInfo", JSON.stringify(result.data.userinfo))
                setUserInfo(result.data.userinfo)
                setToken(result.data.token)
                navigate("/")
                return
            }


        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.status === 400) {
                setregisterValidationErrors(error.response.data.errors)
            }

        }
    }

    return (
        <>
            <div className="content">
                <div className="flex-div">
                    <div className="name-content">
                        <img src="https://finshiksha.com/wp-content/uploads/2022/04/Nykaa-Banner-Image.jpg" alt="" />
                        <p>Nykaa sells many products under its own brand names.</p>
                    </div>
                    <form className="form-1">
                        <input type="text" onChange={(e) => {
                            setregisterDetails({ ...registerDetails, firstName: e.target.value })

                            if (isSubmited) {
                                const validationResult = Validation({ ...registerDetails, firstName: e.target.value }, "register")
                                setregisterValidationErrors(validationResult)
                            }

                        }

                        } id="firstName" placeholder="Firstname" required />
                        {
                            registerValidationErrors.find((x) => x.key === "firstName") ? (
                                <span className="text-danger pos">
                                    {
                                        registerValidationErrors.find((x) => x.key === "firstName").message
                                    }
                                </span>
                            ) : ""
                        }
                        <input type="text" onChange={(e) => { 
                              setregisterDetails({ ...registerDetails, lastName: e.target.value })
                              if (isSubmited) {
                                const validationResult = Validation({ ...registerDetails, lastName: e.target.value }, "register")
                                setregisterValidationErrors(validationResult)
                            }
                            }
                            
                            } id="lastName" placeholder="Lastname" required />
                            {
                            registerValidationErrors.find((x) => x.key === "lastName") ? (
                                <span className="text-danger pos">
                                    {
                                        registerValidationErrors.find((x) => x.key === "lastName").message
                                    }
                                </span>
                            ) : ""
                        }

                        <input type="text" onChange={(e) => 
                        {setregisterDetails({ ...registerDetails, email: e.target.value })
                        if (isSubmited) {
                            const validationResult = Validation({ ...registerDetails, email: e.target.value }, "register")
                            setregisterValidationErrors(validationResult)
                        }}
                    } id="email" placeholder="Email or Phone Number" required />
                     {
                            registerValidationErrors.find((x) => x.key === "email") ? (
                                <span className="text-danger pos">
                                    {
                                        registerValidationErrors.find((x) => x.key === "email").message
                                    }
                                </span>
                            ) : ""
                        }
                        <input type="password" onChange={(e) =>
                        { setregisterDetails({ ...registerDetails, password: e.target.value })
                        if (isSubmited) {
                            const validationResult = Validation({ ...registerDetails, password: e.target.value }, "register")
                            setregisterValidationErrors(validationResult)
                        }
                    }
                    } id="password" placeholder="Password" required />
                    {
                            registerValidationErrors.find((x) => x.key === "password") ? (
                                <span className="text-danger pos">
                                    {
                                        registerValidationErrors.find((x) => x.key === "password").message
                                    }
                                </span>
                            ) : ""
                        }
                        <button className="login" onClick={RegisterHandler} type="button">Create New Account</button>
                        <div className="col-12 mb-3">
                            <div className="d-flex gap-1 justify-content-center align-items-center">
                                <hr className="d-block" style={{ width: "2rem" }} />
                                <i className="fw-normal" style={{ fontSize: "1rem" }}>
                                    Allready have an Account
                                </i>
                                <hr className="d-block" style={{ width: "2rem" }} />
                            </div>
                        </div>
                        <hr />
                        <button onClick={() => navigate("/login")} className="create-account">Sign In</button>
                    </form>
                </div>
            </div>

        </>
    )
}