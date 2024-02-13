import React,{useState,useEffect} from 'react';
import {Container,Row,Col,Table} from 'react-bootstrap';
import {cartDetails} from '../Config/Myservice';
import Header from './Header';
import Footer from './Footer'
function AllOrders() {
    let [temp,setTemp]=useState([]);
    useEffect(()=>{
        //For Getting Order Details
        cartDetails(sessionStorage.getItem('user'))
        .then(res=>{
            if(res.data.user){
                console.log(res.data.user);
                let data1 =res.data.user;
                setTemp(data1);
                console.log(data1);
            }else{
                console.log(res.data.err);
            }
        })
    },[])
    console.log(temp);
    return (
        <div>
            <Header/>
            <Container>
                {temp.map((value,index)=>{
                    return(
                        <p key={index}>
                            <h5><b>Order Placed On  : {value.date}</b></h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {temp[index].items.map((val,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img src={val.productImage} height='90px' width='120px'/></td>
                                                <td>{val.productName}</td>
                                                <td>{val.quantity}</td>
                                                <td>{val.productCost}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </Table>
                        </p>
                    )
                })}
            </Container>
            <Footer/>
        </div>
    )
}
export default AllOrders