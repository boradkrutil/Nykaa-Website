import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Component/Footer';
import Header from './Component/Header';
import HomeScreen from './Screens/HomeScreen';
import ProductDetailScreen from './Screens/ProductDetailScreen';
import { useState } from 'react';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import Register from './Screens/Register';


function App() {

  const[cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"))

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo') || "[]"))
  const [token, setToken] = useState(localStorage.getItem('token') || "")

 

  return (
    <BrowserRouter>

    

      <Header cartItems={cartItems} setUserInfo={setUserInfo} setToken={setToken} userInfo={userInfo} token ={token} />
      <main style={{ minHeight: "89.2vh" }}>
         <Routes>
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/product/:id' element={<ProductDetailScreen  setcartItems={setcartItems} cartItems={cartItems}/>} />
            <Route path='/cart' element={<CartScreen setcartItems={setcartItems} cartItems={cartItems}/>}/>
            <Route path='/login' element={<LoginScreen setUserInfo={setUserInfo} setToken={setToken}/>} />
            <Route path='/register' element={<Register  setUserInfo={setUserInfo} setToken={setToken}/>}/>

          </Routes>        

      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
