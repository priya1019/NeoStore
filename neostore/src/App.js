import React,{Suspense} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const InvoicePdf =React.lazy(()=>import('./components/InvoicePdf')) ;
const AllOrders =React.lazy(()=>import('./components/AllOrders')) ;
const Order =React.lazy(()=>import ('./components/Order')) ;
const Checkout =React.lazy(()=>import('./components/Checkout')) ;
const Cart =React.lazy(()=>import('./components/Cart')) ;
const GoogleMap = React.lazy(()=>import('./components/GoogleMap'));
const Sidebar = React.lazy(()=>import('./components/Sidebar'));
const Dashboard =React.lazy(()=>import('./components/Dashboard')) ;
const Productdetails =React.lazy(()=>import('./components/Productdetails')) ;
const Products =React.lazy(()=>import('./components/Products'));
const Addaddress = React.lazy(()=>import('./components/Addaddress'));
const Profile =React.lazy(()=>import('./components/Profile')) ;
const ForgotPassword =React.lazy(()=>import('./components/ForgotPassword')) ;
const Register =React.lazy(()=>import ('./components/Register')) ;
const Header =React.lazy(()=> import("./components/Header")) ;
const Footer =React.lazy(()=> import('./components/Footer')) ;
const Login =React.lazy(()=> import('./components/Login')) ;
const Thankyou = React.lazy(()=>import ('./components/Thankyou'));
const Changepassword = React.lazy(()=>import ('./components/Changepassword'))
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div><img src='../Loading.gif' alt="Loading..."/></div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/thankyou" element={<Thankyou/>}/>
          <Route path="/changepassword" element={<Changepassword/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/getprofile" element={<Profile/>}/>
          <Route path="/addaddress" element={<Addaddress/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/productdetails" element={<Productdetails/>}/>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/sidebar" element={<Sidebar/>}/>
          <Route path="/map" element={<GoogleMap/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/allorders" element={<AllOrders/>}/>
          <Route path="/invoicepdf" element={<InvoicePdf/>}/>
        </Routes>
      </BrowserRouter>
  </Suspense>
    </div>
  );
}

export default App;
