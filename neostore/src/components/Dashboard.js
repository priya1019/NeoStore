import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import Header from './Header';
import Footer from './Footer';
function Dashboard() {
    return (
        <div>
            <Header />
            <Slide easing='ease'>
                <div className='each-slide'>
                    <div>
                        <img src='../Media/1.jpg' style={{ width: '100%', height: 350 }} />
                    </div>
                </div>
                <div className='each-slide'>
                    <div >
                        <img src='../Media/2.jpg' style={{ width: '100%', height: 350 }} />
                    </div>
                </div>
                <div className='each-slide'>
                    <div >
                        <img src='../Media/3.jpg' style={{ width: '100%', height: 350 }} />
                    </div>
                </div>
                <div className='each-slide'>
                    <div >
                        <img src='../Media/4.jpg' style={{ width: '100%', height: 350 }} />
                    </div>
                </div>
                <div className='each-slide'>
                    <div >
                        <img src='../Media/5.jpg' style={{ width: '100%', height: 350 }} />
                    </div>
                </div>
            </Slide><br /><br />
            <Container className='bg-dark'>
                <h1 style={{ color: 'white' }}> Products</h1>
                <Row>
                    <Col>
                        <div className='container1'>
                            <img src='../Media/1.jpg' alt="Images" className="image" style={{ height: 300, width: 500 }} />
                            <div className='middle'>
                                <div className='text'><a style={{textDecoration:'none',color:'white'}} href='products'>Sofa</a></div>
                            </div>
                        </div></Col>
                    <Col>
                        <div className='container1'>
                            <img src='../Media/table.JPG' alt="Images" className="image" style={{ height: 300, width: 500 }} />
                            <div className='middle'>
                                <div className='text'><a style={{textDecoration:'none',color:'white'}} href='products'>Table</a></div>
                            </div>
                        </div></Col>
                </Row>
                <Row>
                    <Col>
                        <div className='container1'>
                            <img src='../Media/bed.JPG' alt="Images" className="image" style={{ height: 300, width: 500 }} />
                            <div className='middle'>
                                <div className='text'><a style={{textDecoration:'none',color:'white'}} href='products'>Bed</a></div>
                            </div>
                        </div></Col>
                    <Col>
                        <div className='container1'>
                            <img src='../Media/cupboard.JPG' alt="Images" className="image" style={{ height: 300, width: 500 }} />
                            <div className='middle'>
                                <div className='text'><a style={{textDecoration:'none',color:'white'}} href='products'>Cupboard</a></div>
                            </div>
                        </div></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
export default Dashboard