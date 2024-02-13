import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router';
import { Container,Button, Form, Row, Col, Card } from "react-bootstrap";
import {authentication} from '../Config/Myservice';
import Header from './Header';
import {useLocation} from 'react-router';
import Cards from "react-credit-cards";
import Footer from './Footer'
import "react-credit-cards/es/styles-compiled.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function Checkout() {
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER })
    const navigate=useNavigate();
    const [number,setNumber]=useState('');
    const [name,setName]=useState('');
    const [cvc,setCvc]=useState('');
    const [focus,setFocus]=useState('');
    const [expiry,setExpiry]=useState('');
    const [cart,setCart]=useState([]);
    const {state} =useLocation();
    useEffect(()=>{
        //For Checking Whether the User is logged In or Not
        if(sessionStorage.getItem('_token')!=undefined){
            authentication(sessionStorage.getItem("_token"))
            .then(res=>{
                if(res.data.msg){
                    success(res.data.msg);
                }
            })
        }else{
            warning("Login is Required");
            navigate("/login")
        }
        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        setCart(cartItems)
    },[])
    //For Checkout
    const checkout=()=>{
        navigate('/addaddress',{state : {orderno : state.orderno}})
    }
    return (
        <div>
            <Header/>
            <Card className='bg-light' style={{ width: 400, margin: 70, marginLeft: 500 }}>
                <h2>Check Out</h2>
                <Cards number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focus}/><br/>
                <Form style={{padding:8}}>
                    <Form.Group>
                            <Form.Control  className=" inp" type='number' value={number} placeholder='Enter Credit Card Number' name="number" onChange={(e)=>{setNumber(e.target.value)}}  onFocus={e=>setFocus(e.target.name)}></Form.Control>
                            {number.length > 16  && <span className='text-danger'>Enter Credit Card Number Properly</span>}
                    </Form.Group>
                    <Form.Group>
                            <Form.Control  className="inp" type='text' value={name} placeholder='Enter Name' name="name" onChange={(e)=>{setName(e.target.value)}} onFocus={e=>setFocus(e.target.name)}></Form.Control>
                            {name!='' && name.length < 4 && <span className="text-danger">Enter Name correctly</span>}
                    </Form.Group>
                    <Form.Group>
                            <Form.Control  className=" inp" type='text' placeholder='MM/YY Expiry' value={expiry} name="expiry" onChange={(e)=>{setExpiry(e.target.value)}}  onFocus={e=>setFocus(e.target.name)}></Form.Control>
                            {expiry!='' && expiry.length > 4 && <span className="text-danger">Enter Expiry Date correctly</span>}
                    </Form.Group>
                    <Form.Group>
                            <Form.Control  className=" inp" type='number' placeholder='CVC' value={cvc} name="cvc"  onChange={(e)=>{setCvc(e.target.value)}} onFocus={e=>setFocus(e.target.name)}></Form.Control>
                            {cvc!='' && cvc.length > 3 && <span className="text-danger">Enter CVV correctly</span>}
                    </Form.Group><br/>
                    <Button variant='primary' onClick={()=>checkout()}>Checkout</Button>
                <br/>
                </Form>
            </Card>
            <Footer/>
        </div>
    )
}

export default Checkout
