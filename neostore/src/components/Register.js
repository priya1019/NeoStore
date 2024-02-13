import React, { useState, useRef, useEffect } from 'react'
import Header from './Header'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Footer from './Footer'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router';
import SocialButton from './SocialButton'
import { registerUser } from '../Config/Myservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const regForName = RegExp(/^[A-Za-z]{3,10}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
const RegForMobile = RegExp('^((\\+91-?)|0)?[0-9]{10}$')
function Register() {
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const [data, setData] = useState({});
    const [flag, setFlag] = useState(false);
    const [select, setSelect] = useState()
    const pass = useRef()
    const navigate = useNavigate();
    const [Errors, setError] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confpassword: '',
        mobile: '',
        gender: '',
        dob: '',
    })
    useEffect(() => {
        if (localStorage.getItem("_token")) {
            let token = localStorage.getItem("_token");
            let decode = jwt_decode(token);
        }
    }, []);
    //For Validation 
    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'fname':
                Errors.fname = regForName.test(value) ? '' : 'Enter First Name Correctly';
                break;
            case 'lname':
                Errors.fname = regForName.test(value) ? '' : 'Enter Last Name Correctly';
                break;
            case 'email':
                Errors.email = regForEmail.test(value) ? '' : 'Enter Email Correctly';
                break;
            case 'password':
                Errors.password = regForPass.test(value) ? '' : 'Password must be between 6 to 16 characters and must contain one number and one special character';
                break;
            case 'confpassword':
                Errors.confpassword = pass.current.value !== value ? 'Password And Confirm Password Should Match' : '';
                break;
            case 'mobile':
                Errors.mobile = RegForMobile.test(value) ? '' : 'Phone Number should be valid';
                break;
        }
        // setSelect({ Errors, [name]: value }, () => {})
        //For Setting Data
        setData({ ...data, [name]: value })
    }
    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) =>
            val.length > 0 && (valid = false));
        return valid;
    }
    //For Adding Data in Backend
    const register = (e) => {
        e.preventDefault();
        setFlag(true)
        if (validate(Errors)) {
            registerUser(data)
                .then((res, err) => {
                    if (res.data.err) {
                        failure(res.data.err)
                    }
                    else {
                        success("Registered Successfully")
                        navigate("/login")
                    }
                });
        }
    }
    //For Social Login 
    const handleSocialLogin = async(user) => {
        let formData = {
            fname : user._profile.firstName,
            lname:user._profile.lastName,
            email:user._profile.email,
            mobile:9999999999,
            password:user._profile.id,
            gender:'undefined',
        };
        await registerUser(formData)
        .then(res=>{
            if(res.data.err){
                failure(res.data.err)
            }else{
                success("Registered Successfully")
                navigate("/login")
            }
        })
    }
    //For Social Login Failure
    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };
    //For Showing Password
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    return (
        <div>
            <Header /><br />
            <SocialButton className='btn btn-danger' style={{ height: 70, width: 300 }}
                provider="google"
                appId="965834070463-nlt50hm305brepc4p3rj2l58687kpq97.apps.googleusercontent.com"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
            >
                <i className="fab fa-google fa-3x"></i>  Login with Google
            </SocialButton>&nbsp;&nbsp;
            <SocialButton className='btn btn-primary' style={{ height: 70, width: 300 }}
                provider="facebook"
                appId="580744276481816"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
            >
                <i className="fab fa-facebook fa-3x" ></i>  Login with Facebook
            </SocialButton>
            <hr />
            <Container className='bg-light border border-dark'><br />
                <h1 style={{ color: 'black' }}>Register to <b>Neo<span style={{ color: 'red' }}>STORE</span></b></h1><hr />
                <Form onSubmit={register} enctype="multipart/form-data">
                    <Col>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="text" placeholder="Enter First Name" name="fname" onChange={handler} />
                            {Errors.fname.length > 0 && <span style={{ color: "red" }}>{Errors.fname}</span>}
                        </Form.Group>
                    </Col>
                    <Form.Group className="mb-3"  >
                        <Form.Control type="text" placeholder="Enter Last Name" name="lname" onChange={handler} />
                        {Errors.lname.length > 0 && <span style={{ color: "red" }}>{Errors.lname}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Control type="email" placeholder="Enter Email" name="email" onChange={handler} />
                        {Errors.email.length > 0 && <span style={{ color: "red" }}>{Errors.email}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder="Password" name="password" onChange={handler} ref={pass} />
                        {Errors.password.length > 0 && <span style={{ color: "red" }}>{Errors.password}</span>}
                        <br />
                        <span className='btn btn-light' onClick={togglePassword}><i class="fas fa-eye-slash"></i></span>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder="Confirm Password" name="confpassword" onChange={handler} />
                        {Errors.confpassword.length > 0 && <span style={{ color: "red" }}>{Errors.confpassword}</span>}
                        <br />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Control type="number" placeholder="Enter Mobile Number" name="mobile" onChange={handler} />
                        {Errors.mobile.length > 0 && <span style={{ color: "red" }}>{Errors.mobile}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Control type="date" placeholder="Enter Date of Birth" name="dob" onChange={handler} />
                    </Form.Group>
                    <input type="radio" value="Male" name="gender" onChange={handler} /> Male &nbsp;
                    <input type="radio" value="Female" name="gender" onChange={handler} /> Female<br /><br />
                    <Button type="submit">Register</Button>
                    <br />
                </Form><br />
            </Container>
            <Footer />
        </div>
    )
}
export default Register