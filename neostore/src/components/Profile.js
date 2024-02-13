import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Footer from "./Footer";
import Sidebar from './Sidebar'
import { getProfile, editProfile } from '../Config/Myservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function Profile() {
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER })
    let [fname, setFname] = useState('');
    let [lname, setLname] = useState('');
    let [email, setEmail] = useState('');
    let [mobile, setMobile] = useState('');
    let [gender, setGender] = useState('');
    let [dob, setDob] = useState('');
    let [user, setUser] = useState([]);
    const [flag, setFlag] = useState(false)
    //For Getting Data  and Setting Data
    useEffect(() => {
        getProfile(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    let data = res.data.user;
                    console.log(data);
                    setUser(data);
                    setFname(data.fname)
                    setLname(data.lname)
                    setEmail(data.email)
                    setMobile(data.mobile)
                    setGender(data.gender)
                    setDob(data.dob)
                }
            })
    }, [])
    //For Editing Data 
    const EditProfile = (id) => {
        let data = { fname: fname, lname: lname, email: email, mobile: mobile, gender: gender, dob: dob }
        editProfile(id, data)
            .then(res => {
                if (res.data.err) {
                    failure(res.data.err)
                } else {
                    success(res.data.msg)
                    setFlag(false)
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
                    {flag ? <>
                        <div className='bg-light border border-dark'><br />
                            <h1>Edit Profile</h1>
                            <Form className='container'>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="text" placeholder="Enter First Name" name="fname" defaultValue={user.fname} onChange={(e) => { setFname(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="text" placeholder="Enter Last Name" name="lname" defaultValue={user.lname} onChange={(e) => { setLname(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="number" placeholder="Enter Mobile Number" name="mobile" defaultValue={user.mobile} onChange={(e) => { setMobile(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="text" placeholder="Enter Gender" name="gender" defaultValue={user.gender} onChange={(e) => { setGender(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="text" placeholder="Enter Date of Birth" name="dob" defaultValue={user.dob} onChange={(e) => { setDob(e.target.value) }} />
                                </Form.Group>
                                <Button type="submit" onClick={() => EditProfile(user._id)}>Save</Button><br />
                                <div className="mb-2"><Button variant="light" onClick={() => setFlag(false)} fullWidth>&nbsp;Cancel</Button></div>
                            </Form><br />
                        </div>
                    </> :
                        <div className='bg-light border border-dark'><br />
                            <h1>My Profile</h1>
                            <Form className='container'>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="text" placeholder="Enter First Name" name="fname" defaultValue={user.fname} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="text" placeholder="Enter Last Name" name="lname" defaultValue={user.lname} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="email" placeholder="Enter Email" name="email" defaultValue={user.email} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="number" placeholder="Enter Mobile Number" name="mobile" defaultValue={user.mobile} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="text" placeholder="Enter Gender" name="gender" defaultValue={user.gender} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="text" placeholder="Enter Mobile Number" name="dob" defaultValue={user.dob} disabled />
                                </Form.Group>
                                <Button type="submit" onClick={() => setFlag(true)}>Edit Profile</Button><br />
                            </Form> <br />
                        </div>
                    }
                </Col>
            </Row>
            <Footer />
        </div>
    )
}
export default Profile