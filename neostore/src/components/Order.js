import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Button, Row, Col, Card } from 'react-bootstrap'
import { cartDetails } from '../Config/Myservice';
import { useNavigate } from 'react-router'
function Order() {
    let [temp, setTemp] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        //For Getting Order Details
        cartDetails(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    let data1 = res.data.user;
                    setTemp(data1);
                    console.log(data1);
                } else {
                    console.log(res.data.err);
                }
            })
    }, [])
    console.log(temp);
    //For getting Single Order Data with Id
    const singleItem = (id) => {
        console.log(id);
        navigate("/invoicepdf", { state: { id: id } })
    }
    return (
        <div>
            <Header />
            <Row>
                <Col lg={4}>
                    <Sidebar />
                </Col>
                <Col lg={7} ><br />
                <h4>All Orders</h4>
                <hr/>
                <section>
                    {temp.map((value,index)=>{
                    return (
                        <p key={index}>
                            <Card style={{ width: "700px", height: "280px" }}>
                                <h4 style={{margin:4}}><span style={{color:'orange',float:'left'}}>TRANSIT </span>&nbsp; &nbsp;<span style={{float:'left'}}>Order by </span><b style={{float:'left'}}>Order_No: {value.Orderno}</b></h4>
                                <p style={{margin:4}}><b style={{float:'left'}}>Placed on {value.date}</b></p>
                                
                                <Row>
                                    {temp[index].items.map((val)=>{
                                        return (
                                            <div className='row  col-4 ' >
                                                <div className='pl-4 '>
                                                    <img src={val.productImage} height="120px" width="120px"/>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Row><br/>
                                <Button style={{height:40,width:300,margin:5}} onClick={()=>singleItem(value._id)}>Download Invoice as PDF</Button>
                            </Card>
                        </p>
                    )
                    })}
                </section>
                </Col>
            </Row>
            <Footer/>
        </div>
    )
}

export default Order