import React, { useState, useEffect } from 'react'
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Header from './Header'
import Footer from './Footer'
import { forgotPassword, sendMailotp } from '../Config/Myservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
function ForgotPassword() {
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confpassword, setConfpassword] = useState('');
    let [otpcode, setOtpcode] = useState('');
    const navigate = useNavigate();
    //For Sending Otp to Mail
    const sendotp = async () => {
        let data = { email: email }
        sendMailotp(data)
            .then((res, err) => {
                if (res.data.err) {
                    failure(res.data.err)
                } else {
                    success(res.data.msg)
                }
            })
    }
    //For Changing Password 
    const changepassword = async () => {
        let data = { otpcode: otpcode, password: password, confpassword: confpassword, email: email }
        forgotPassword(data)
            .then((res) => {
                if (res.data.err == 1) {
                    failure(res.data.msg)
                } else if (res.data.err == 0) {
                    success(res.data.msg)
                }
                navigate("/login")
            })
    }
    return (
        <div>
            <Header/><br /><br />
            <Container className='bg-light border border-dark'>
                <br />
                <h2>Forgot Your Password? No Problem </h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter Email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                        {email != '' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                    </Form.Group>
                    <Button onClick={sendotp}>Send OTP</Button><br /><br />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter OTP" name="otpcode" maxLength={4} onChange={(e) => { setOtpcode(e.target.value) }} />
                        {otpcode != '' && otpcode.length < 4 && <span className="text-danger">Enter OTP Code correctly</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Enter New Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                        {password != '' && password.length < 8 && <span className="text-danger">Enter New Password  correctly</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Enter Confirm Password" name="confpassword" onChange={(e) => { setConfpassword(e.target.value) }} />
                        {confpassword != '' && confpassword.length < 8 && <span className="text-danger">Enter Confirm Password  correctly</span>}
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={changepassword}>
                        Change Password
                    </Button>
                </Form><br /><br />
            </Container><br /><br />
            <Footer />
        </div>
    )
}
export default ForgotPassword