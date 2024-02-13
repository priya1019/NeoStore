import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Modal, FloatingLabel, Card } from 'react-bootstrap'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import { BiCheckbox } from 'react-icons/bi';
import Sidebar from './Sidebar';
import { getProfile, addAddress, deleteAddress, updateAddress, cartAddress } from '../Config/Myservice'
import Header from './Header'
import Footer from './Footer'
import { useLocation } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export default function Address() {
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const [errors, setError] = useState({
        err_oldpass: '', err_npass: '', err_cpass: '', err_fname: '', err_lname: '', err_mobile: '',
        err_address: '', err_pincode: '', err_city: '', err_states: '', err_country: ''
    })
    const [user, setUser] = useState([]);
    const [showadd, setShowadd] = useState(false);
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [states, setstates] = useState('');
    const [country, setCountry] = useState('')
    const [show, setShow] = useState(false);
    const [Address_id, setAddress_id] = useState('');
    const [status, setStatus] = useState(false)
    const [getAddress, setGetAddress] = useState([])
    const [email, setEmail] = useState('');
    const { state } = useLocation();
    useEffect(() => {
    //For Getting Address 
        getProfile(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    console.log(res.data.user.Address)
                    let data = res.data.user;
                    setUser(data);
                    setEmail(data.email);
                    setGetAddress(res.data.user.Address)
                    console.log(res.data.user.Address)
                    console.log(user)
                }
            })
    }, [show, status])
    //For Adding new Address
    const Addnewaddress = (e) => {
        e.preventDefault();
        console.log("Add Address")
        let email = sessionStorage.getItem('user')
        let data = { email: email, address: address, pincode: pincode, city: city, states: states, country: country }
        console.log(data)
        addAddress(data)
            .then((res) => {
                console.log(res.data)
            })
        setShow(false)
        window.location.reload();
    }
    //For Setting Edited Address
    const editadd = (event, addr) => {
        event.preventDefault();
        console.log(addr)
        console.log("edit  address clicked")
        setAddress(addr.address)
        setPincode(addr.pincode)
        setCity(addr.city)
        setstates(addr.states)
        setCountry(addr.country)
        setAddress_id(addr.Address_id)
        setShowadd(true);
        console.log(showadd)
    }
    //For Editing Address 
    const Addaddress = (e) => {
        e.preventDefault();
        let update = true;
        console.log("Add Address")
        let email = sessionStorage.getItem('user')
        let data = { Address_id: Address_id, email: email, address: address, pincode: pincode, city: city, states: states, country: country, update: update }
        console.log(data)
        updateAddress(data)
            .then((res) => {
                console.log(res.data)
            })
        setShowadd(false)
        window.location.reload();
    }
    //For Deleting Address
    const deleteAdd = (e, addr) => {
        e.preventDefault();
        console.log(addr)
        let email = sessionStorage.getItem('user')
        deleteAddress(email, addr)
            .then((res) => {
                console.log(res.data)
                setStatus(true)
            })
        setStatus(false)
    }
    //For Selecting Address For Placing Order
    const selectadd = (e, addr) => {
        e.preventDefault();
        let data = { email: sessionStorage.getItem('user'), selectaddr: addr, orderno: state.orderno }
        cartAddress(data)
            .then((res) => {
                console.log(res.data)
                success("Address added ")
                localStorage.removeItem("mycart");
            });
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Header />
            <Row >
                <Col lg={4}>
                    <Sidebar />
                </Col>
                <Col><br />
                    <Button variant="primary" href='/order' className="mb-2">Confirm Order</Button>
                    <Card style={{ width: "850px", padding: 10 }} className="bg-light border border-dark">
                        <section >
                            <Row className="pt-2">
                                <h2>Address</h2>
                                <div style={{ textAlign: "right" }}>
                                    <Button variant="dark" size="sm" onClick={handleShow} className="col-md-12 text-center">
                                        Add Address
                                    </Button>
                                </div>
                            </Row>
                            < hr className="mr-3" />
                        </section>
                        <section >
                            {getAddress.map((addr) =>
                                <Row >
                                    <div style={{ display: 'inline-block' }}>
                                        <a onClick={(e) => { selectadd(e, addr) }} style={{ float: 'left' }} ><BiCheckbox /> </a>
                                        <Card style={{ width: "500px", height: "180px", marginLeft: 40 }} className="col-md-12 text-center" >
                                            <br />
                                            <h6>{addr.address} <span>,{addr.states}</span></h6>
                                            <h6>{addr.city} <span>,{addr.pincode}</span></h6>
                                            <h6>{addr.country}</h6>
                                            <div>
                                                <Button onClick={(e) => { editadd(e, addr) }} variant="primary"><MdModeEdit />Edit</Button>
                                                <Button onClick={(e) => { deleteAdd(e, addr) }} variant="danger" style={{ marginLeft: "10px" }}><MdDelete />Delete</Button>
                                            </div>
                                        </Card>
                                    </div>
                                    <hr className='m-3 mr-3' />
                                    {showadd ?
                                        <Modal show={showadd} onHide={handleClose} >
                                            <Modal.Header closeButton>
                                                <Modal.Title >Edit Your Address Details</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form  >
                                                    <h6>Edit Your Address</h6>
                                                    <FloatingLabel label="Address" className="mb-3">
                                                        <Form.Control as="textarea" placeholder="Address" name="address" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                                        <Form.Text id="passwordHelpBlock" muted>
                                                            Max 100 char
                                                        </Form.Text>
                                                        <span style={{ color: 'red' }}>{errors.err_address}</span>
                                                    </FloatingLabel>
                                                    <Row>
                                                        <Col sm={6} md={6} lg={6}>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="number" name="pincode" placeholder='Pincode' value={pincode} onChange={(e) => { setPincode(e.target.value) }} className="form-control" size="20" />
                                                                <span style={{ color: 'red' }}>{errors.err_pincode}</span>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                                            <Form.Control type="text" name="city" placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} className="form-control" size="20" />
                                                            <span style={{ color: 'red' }}>{errors.err_city}</span>
                                                        </Form.Group></Col>
                                                    </Row>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Control type="text" name="states" placeholder='states' value={states} onChange={(e) => { setstates(e.target.value) }} className="form-control" size="20" />
                                                        <span style={{ color: 'red' }}>{errors.err_states}</span>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Control type="text" name="country" placeholder='Country' value={country} onChange={(e) => { setCountry(e.target.value) }} className="form-control" size="20" />
                                                        <span style={{ color: 'red' }}>{errors.err_country}</span>
                                                    </Form.Group>

                                                    <div style={{ textAlign: "center" }}>
                                                        <Button variant="primary" type="submit" onClick={(e) => { Addaddress(e) }} >
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                        : ''}
                                </Row>
                            )}
                        </section>
                        <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title >Add Address Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form  >
                                    <FloatingLabel label="Address" className="mb-3">
                                        <Form.Control as="textarea" placeholder="Address" name="address" id="address" onChange={(e) => { setAddress(e.target.value) }} />
                                        <Form.Text id="passwordHelpBlock" muted>
                                            Max 100 char
                                        </Form.Text>
                                        {<span style={{ color: 'red' }}>{errors.err_address}</span>}
                                    </FloatingLabel>
                                    <Row>
                                        <Col sm={6} md={6} lg={6}>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="number" name="pincode" placeholder='Pincode' onChange={(e) => { setPincode(e.target.value) }} className="form-control" size="20" />
                                                {<span style={{ color: 'red' }}>{errors.err_pincode}</span>}
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                            <Form.Control type="text" name="city" placeholder='City' onChange={(e) => { setCity(e.target.value) }} className="form-control" size="20" />
                                            {<span style={{ color: 'red' }}>{errors.err_city}</span>}
                                        </Form.Group></Col>
                                    </Row>
                                    <Form.Group className="mb-3" >
                                        <Form.Control type="text" name="states" placeholder='states' onChange={(e) => { setstates(e.target.value) }} className="form-control" size="20" />
                                        {<span style={{ color: 'red' }}>{errors.err_states}</span>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Control type="text" name="country" placeholder='Country' onChange={(e) => { setCountry(e.target.value) }} className="form-control" size="20" />
                                        {<span style={{ color: 'red' }}>{errors.err_country}</span>}
                                    </Form.Group>
                                    <div style={{ textAlign: "center" }}>
                                        <Button variant="primary" type="submit" onClick={Addnewaddress} >
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Card>
                </Col>
            </Row>
            <Footer />
        </>
    )
}