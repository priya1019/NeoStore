import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar';
import { getProfile, changePassword } from '../Config/Myservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function Changepassword() {
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER })
    let [user, setUser] = useState([]);
    let [password, setPassword] = useState('');
    let [confpassword, setConfpassword] = useState('');
    //For Getting Data From Backend and Setting Edited Data
    useEffect(() => {
        getProfile(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    let data = res.data.user;
                    console.log(data);
                    setUser(data);
                    setPassword(data.password);
                    setConfpassword(data.confpassword);
                }
            })
    }, [])
    //For Changing Data in Backend
    const ChangePassword = (e, id) => {
        e.preventDefault();
        let data = { password: password, confpassword: confpassword };
        changePassword(id, data)
            .then(res => {
                if (res.data.err) {
                    failure(res.data.err)
                } else {
                    success(res.data.msg);
                }
            })
    }
    return (
        <div>
            <Header />
            <Row>
                <Col lg={4}>
                    <Sidebar />
                </Col>
                <Col lg={7} ><br />
                    <div className='bg-light border border-dark'><br />
                        <h1>Change Password</h1><br />
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Old Password : </Form.Label>
                                <Form.Control type="password" placeholder="Enter Old Password" name="password" defaultValue={user.password} onChange={(e) => { setPassword(e.target.value) }} disabled />
                                {password != '' && password.length < 8 && <span className="text-danger">Enter Old Password  Correctly</span>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type='password' placeholder="Enter New Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                                {password != '' && password.length < 8 && <span className="text-danger">Enter New Password  correctly</span>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Confirm Password" name="confpassword" onChange={(e) => { setConfpassword(e.target.value) }} />
                                {password != '' && password.length < 8 && <span className="text-danger">Enter Confirm Password  correctly</span>}
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={(e) => ChangePassword(e, user._id)}>
                                Change Password
                            </Button>
                        </Form><br />
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}
export default Changepassword