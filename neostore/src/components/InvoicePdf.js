import React, { useEffect, useState } from 'react';
import { getPdf } from '../Config/Myservice';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom'
import ReactToPdf from 'react-to-pdf';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const ref = React.createRef();
const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
};
function InvoicePdf() {
    const [datas, setDatas] = useState([]);
    const { state } = useLocation();
    //For Getting OrderDetails
    useEffect(() => {
        console.log(state.id);
        getPdf(state.id)
            .then((res) => {
                console.log(res.data);
                console.log(res.data.pdf);
                setDatas(res.data.pdf)
            })
    }, [])
    console.log(datas);
    //For Table Styling
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <div>
            <div className="container" >
                <nav class="navbar">
                    <div class="container-fluid">
                        <Link to="/allorders"><button className='btn btn-primary'>Go Back</button></Link>
                        <button className="d-flex justify-content-sm-end btn btn-success">
                        <ReactToPdf targetRef={ref} filename={`_invoice.pdf`} options={options} x={0.8} y={0.2} scale={0.8}>
                            {({ toPdf }) => (
                                <button onClick={() => {
                                    toPdf();
                                }}  className='d-flex justify-content-sm-end btn btn-success'>
                                   Click To Convert in PDF
                                </button>
                            )}
                        </ReactToPdf>
                    </button>
                    </div>
                </nav>
                <div ref={ref} id="divToPrint" className="container p-3" style={{ border: "2px solid grey", backgroundColor: 'white', width: "800px" }}>

                    <nav class="navbar  navbar-light bg-light" >
                        <div class="container-fluid" style={{ height: "168px" }}>
                            <img src='../Media/neostore.jpg' alt="" height="70px" width=" 250px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                            <h2 style={{ marginTop: "5px", float: 'right' }}><b>Neo<span style={{ color: 'red' }}>STORE</span> &nbsp;
                                INVOICE</b></h2>
                        </div>
                    </nav>
                    <div className='row m-0 border'>
                        <div className='col ml-6' style={{ float: 'left' }}>
                            <h6 style={{ textAlign: "left", marginLeft: "15px" }}>From</h6>
                            <h5 style={{ textAlign: "left", marginLeft: "15px" }}>NeoStore Shopping Pvt LTD</h5>
                            <h5 style={{ textAlign: "left", marginLeft: "15px" }}>neostore@gmail.com</h5>
                            <h5 style={{ textAlign: "left", marginLeft: "15px" }}>Dadar-West</h5>
                            <h5 style={{ textAlign: "left", marginLeft: "15px" }}>8888888888</h5>
                            <br />
                            <h6 style={{ textAlign: "left", marginLeft: "15px" }}>Bill To</h6>
                            {datas.map((value, index) => {
                                return (
                                    <>
                                        <h5 style={{ textAlign: "left", marginLeft: "15px" }}>{value.email}</h5>
                                        <h5 style={{ textAlign: "left", marginLeft: "15px" }}>{value.selectaddr.address}</h5>
                                        <h5 style={{ textAlign: "left", marginLeft: "15px" }}>{value.selectaddr.pincode}</h5>
                                        <h5 style={{ textAlign: "left", marginLeft: "15px" }}>{value.selectaddr.state}</h5>
                                        <h5 style={{ textAlign: "left", marginLeft: "15px" }}>{value.selectaddr.country}</h5>
                                    </>
                                )
                            })}

                        </div>
                        <div className='col text-right mr-4'>
                            {datas.map((value, index) => {
                                return (
                                    <>
                                        <h6 style={{ textAlign: "right", marginRight: "15px" }}>Status</h6>
                                        <h5 style={{ textAlign: "right", marginRight: "15px", color: "red", fontSize: "25px" }}><span style={{ color: 'green' }}>PAID</span></h5>
                                        <br />
                                        <h6 style={{ textAlign: "right", marginRight: "15px" }}>Date</h6>
                                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>{value.date}</h5>
                                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>Amount</h5>
                                        <h3 style={{ textAlign: "right", marginRight: "15px" }}>&#8377; {value.total}</h3>
                                    </>
                                )
                            })}
                        </div>

                    </div>
                    <br />
                    {datas.map((value, index) => {
                        return (
                            <p key={index}>
                                <TableContainer component={Paper} >
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead >
                                            <TableRow>
                                                <StyledTableCell align="right">Sr No.</StyledTableCell>
                                                <StyledTableCell align="right">Item</StyledTableCell>
                                                <StyledTableCell align="right">Qty</StyledTableCell>
                                                <StyledTableCell align="right">Price</StyledTableCell>
                                                <StyledTableCell align="right">Amount</StyledTableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {datas[index].items.map((ele, index) => {
                                                return (
                                                    <StyledTableRow key={index}>
                                                        <StyledTableCell align="right">{index + 1}</StyledTableCell>
                                                        <StyledTableCell align="right"><img src={ele.productImage} height="90px" width="120px" /></StyledTableCell>
                                                        <StyledTableCell align="right">{ele.productName}</StyledTableCell>
                                                        <StyledTableCell align="right">{ele.quantity}</StyledTableCell>
                                                        <StyledTableCell align="right">{ele.productCost}</StyledTableCell>
                                                    </StyledTableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </p>
                        )
                    })}
                    <h2 style={{ color: 'green' }}>Thank You For Shopping With Us !!!!</h2><br /><br /><br /><br />
                </div>
            </div>
        </div>
    )
}
export default InvoicePdf