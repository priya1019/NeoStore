import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, NavDropdown, Container, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { getProfile } from '../Config/Myservice';
function Header() {
    let [user, setUser] = useState([]);
    const [length ,setLength] =useState('')
    const navigate = useNavigate();
    //For Getting Name in Dropdown
    useEffect(() => {
        getProfile(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    let data = res.data.user;
                    console.log(data);
                    setUser(data);
                }
            })
    }, [])
    useEffect(() => {
        let arr = JSON.parse(localStorage.getItem('mycart'));
        console.log(arr)
        if (arr === null) {
            setLength(0)
        }
        else {
            setLength(arr.length)
            console.log(length)
        }

    })
    //For Logout
    const logout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate("/")
    }
    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/"><h2 style={{ color: 'white' }}>Neo<span style={{ color: 'red' }}>STORE</span></h2></Navbar.Brand>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Navbar.Toggle aria-controls="basic-navbar-nav" bg="light" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link style={{ color: 'white' }} href="/">Home</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Nav.Link style={{ color: 'white' }} href="products">Products</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Nav.Link style={{ color: 'white' }} href="/allorders">Order</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Form className="d-flex">
                                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                            </Form>
                            <Button className='btn btn-light' href='cart' style={{display:'inline-block'}}> <i class="fal fa-shopping-cart"></i> Cart <span style={{color:'red',fontSize:20}}><b>{length}</b></span></Button>&nbsp;
                            <Button className='btn btn-light'>
                                {sessionStorage.getItem('_token')== undefined ? <>
                                <NavDropdown id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login"><i class="fas fa-user"></i> Login</NavDropdown.Item>
                                <NavDropdown.Item href="/register"><i class="fas fa-user"></i> Register</NavDropdown.Item>
                                </NavDropdown>
                                </> : <>
                                <NavDropdown id="basic-nav-dropdown" title={user.fname}>
                                    <NavDropdown.Item href="getprofile"><i class="fas fa-users"></i> View Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e)=>{logout(e)}}><i class="fas fa-sign-out-alt"></i> Logout</NavDropdown.Item>
                                </NavDropdown>
                                </>}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header