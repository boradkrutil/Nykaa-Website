import { Link, useNavigate } from 'react-router-dom';
import logo from "./logopic/logo.png";

export default function Header({ cartItems, token, setUserInfo, setToken }) {

  const navigate = useNavigate()

  const ClickToLogin = () =>{
      return navigate("/login")
  }

  const Logouthandler = () =>{
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
    setUserInfo({})
    setToken("")
}
  return (
    <div className="container border-bottom">
      <header className='d-flex justify-content-between text-dark align-items-center bg-white mt-2'>
        <Link to={".."}>
          <div className="left">
            <img src={logo} alt=''></img>
          </div>
        </Link>

        <div className="right d-flex gap-3 align-items-center">
          <button type='button' onClick={token ? Logouthandler : ClickToLogin} className='btn'>{token ? "SignOut" : "SignIn"}</button>
          <Link to={"/cart"}>
            <div style={{ position: "relative" }}>
              <span className='text-center text-white' style={{ position: "absolute", top: "-8px", left: "20px", borderRadius: "50%", height: "23px", width: "20px", backgroundColor: "#e80071" }}>{cartItems.length}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg></div>
          </Link>

        </div>

      </header>
    </div>
  )
}

