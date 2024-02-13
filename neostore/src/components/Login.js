import React, { useState,useEffect } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';
import { useNavigate } from 'react-router';
import { loginUser } from '../Config/Myservice';
import SocialButton from './SocialButton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
function Login() {
  const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER })
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');;
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  //For Checking token 
  useEffect(()=>{
    if(sessionStorage.getItem('_token')!=undefined){
      sessionStorage.removeItem('_token')
    }
  },[])
  //For Checking user Exists and Then redirecting to Dashboard
  const login = (e) => {
    e.preventDefault();
    let data = { email: email, password: password };
    loginUser(data)
      .then((res, err) => {
        if (res.data.err) {
          failure(res.data.err)
          navigate("/login")
        } else {
          success(res.data.msg)
          console.log(res.data);
          sessionStorage.setItem("_token", res.data.token);
          localStorage.setItem("user", email)
          sessionStorage.setItem("user", email)
          navigate("/")
        }
      })
  }
  //For Social Login
  const handleSocialLogin = (user) => {
    console.log(user._profile)
    let email = user._profile.email
    loginUser({email:email,password:user._profile.id})
    .then(res=>{
      if(res.data.err){
        warning("Please Use Normal Login ")
      }
      else{
        console.log(res.data);
        sessionStorage.setItem("_token",res.data.token);
        localStorage.setItem("user", email)
        sessionStorage.setItem("user", email)
        navigate("/")
        
      }
    })
  }
  //For Social Login Failure
  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  //For Showing Password
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div>
      <Header /><br /><br />
      <Container>
        <Row>
          <Col >
            <br /><br />
            <SocialButton className='btn btn-danger' style={{ height: 70, width: 300 }}
              provider="google"
              appId="965834070463-nlt50hm305brepc4p3rj2l58687kpq97.apps.googleusercontent.com"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              <i class="fab fa-google fa-3x"></i>  Login with Google
            </SocialButton><br /><br />
            <SocialButton className='btn btn-primary' style={{ height: 70, width: 300 }}
              provider="facebook"
              appId="580744276481816"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              <i class="fab fa-facebook fa-3x" ></i>  Login with Facebook
            </SocialButton>
          </Col>
          <Col className='bg-light border border-dark'><br />
            <h1 style={{ color: 'black' }}>Login to <b>Neo<span style={{ color: 'red' }}>STORE</span></b></h1><hr />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter Email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                {email != '' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type={passwordShown ? "text" : "password"} placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                {password != '' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                <span className='btn btn-light' onClick={togglePassword}><i class="fas fa-eye-slash"></i></span>
              </Form.Group>
              <a style={{ textDecoration: 'none', color: 'black' }} href='forgotpassword'><b>Forgot Password?</b></a>&nbsp;&nbsp;&nbsp;
              <a style={{ textDecoration: 'none', color: 'black' }} href='register'><b>New User</b></a><br /><br />
              <Button variant="primary" type="submit" onClick={login}>
                Login
              </Button>
            </Form><br />
          </Col>
        </Row>
      </Container><br /><br /><br /><br />
      <Footer />
    </div>
  )
}
export default Login
