import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Footer() {
    const [value, setValue] = useState('');
    //For Storing Entered Email by Users
    const onChange = (event) => {
        sessionStorage.setItem("subscriber", event.target.value);
        setValue(event.target.value)
    }
    return (
        <div>
            <div className='bg-dark footer'>
                <Row>
                    <Col style={{ color: 'white' }}>
                        <ul className='list-unstyled'><h4>About Company</h4>
                            <li>NeoSOFT Technologies is here at your quick and easy service for Shopping</li>
                            <li>Contact Information</li>
                            <li>Email : contact@neosofttech.com</li>
                            <li>Phone : +91 0000000000</li>
                            <li>Mumbai, India</li>
                        </ul>
                    </Col>
                    <Col style={{ color: 'white' }}>
                        <ul className='list-unstyled'><h4>Information</h4>
                            <li><a href="../Media/tandc.pdf" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Terms and Conditions</a></li>
                            <li>Gaurantee and Return Policy</li>
                            <li>Contact Us</li>
                            <li>Privacy Policy</li>
                            <li><Link to='/map' target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Locate Us</Link></li>
                        </ul>
                    </Col>
                    <Col style={{ color: 'white' }}>
                        <ul className='list-unstyled'><h4>News Letter</h4>
                            <li>Signup to get exclusive offer from our favourite brands and to be sale up in the news</li><br />
                            <li><input type="text" placeholder='Your Email...' value={value} onChange={onChange}></input></li>
                            <br />
                            <li><Button href='thankyou' className='btn btn-light'>Subscribe</Button></li>
                        </ul>
                    </Col>
                </Row>
                <h5 style={{ color: 'white' }}>CopyRight <i class="far fa-copyright"></i> 1999 by Priya Pandey All Rights Reserved</h5>
            </div>
        </div>
    )
}

export default Footer
