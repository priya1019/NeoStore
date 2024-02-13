import React, { useEffect, useState } from "react";
import { getSingleproduct } from "../Config/Myservice";
import { useLocation } from "react-router";
import ReactImageMagnify from "react-image-magnify";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from "react-share";
import "react-multiple-select-dropdown-lite/dist/index.css";
import ReactStars from "react-rating-stars-component";
import Header from "./Header";
import Footer from "./Footer";
import ShareIcon from '@mui/icons-material/Share';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function ProductDetails(props) {
  const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER })
  let email = sessionStorage.getItem('user')
  const [postdata, setPostdata] = useState([]);
  const [images, setimages] = useState([]);
  const [mainimage, setmainimage] = useState();
  const [rating, setrating] = useState();
  const { state } = useLocation();
  //For Checking Rating in Console
  const ratingChanged = (rating) => {
    console.log(rating);
  };
  //For getting Single Product
  useEffect(() => {
    //Getting Product Data with Id
    console.log(state.id);
    getSingleproduct(state.id)
      .then((res) => {
        console.log(res.data);
        setrating(res.data.product.productRating);
        setPostdata(res.data.product);
        setmainimage(res.data.product.productImage);
        setimages(res.data.image);
      });
  }, []);
  const addCart = (item, id) => {
    if (localStorage.getItem('mycart') != undefined) {
        let arr = JSON.parse(localStorage.getItem('mycart'));
        console.log(arr);
        if (arr.find(x => x.id == id) != undefined) {
            let ind = arr.findIndex(x => x.id === id);
            arr[ind] = { id: id, quantity: arr[ind].quantity + 1, item: item, email: email };
            localStorage.setItem('mycart', JSON.stringify(arr));
            warning("Product quantity is increased");
        } else {
            arr.push({ id: id, quantity: 1, item: item, email: email });
            localStorage.setItem('mycart', JSON.stringify(arr));
            // counter()
            success("Product Added to Cart")
            window.location.reload(false);
        }
    } else {
        let arr = [];
        arr.push({ id: id, quantity: 1, item: item, email: email });
        localStorage.setItem('mycart', JSON.stringify(arr));
        success("Product Added to Cart")
        window.location.reload(false);
    }
}
  console.log(postdata);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row" >
          <div className="container  bg-light p-4 ">
            <div className=" row">
              <div className=" col-md-5">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: mainimage,
                    },
                    largeImage: {
                      src: mainimage,
                      width: 900,
                      height: 900,
                    },
                  }}
                />
              </div>
              <div className="col">
                <div style={{ align: 'left' }}>
                  <h3 style={{float:'left'}}>{postdata.productName}</h3><br/>
                  <h4 style={{float:'left'}}>{postdata.productProducer}</h4> <br/><br/>
                  <div className="col-md-12 text-center" style={{float:'left'}}>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                      className=" col-md-12"
                      
                    /></div>
                  <hr />
                  <hr/>
                  <h5 style={{float:'left'}}> Price:<span className="text-danger">{" "} ₹ {postdata.productCost} </span></h5>
                  <br /><br/>
                  <div className="row">
                    <div >
                      <h4 style={{float:'left'}}>Share <ShareIcon /></h4><br/><br/>
                      <div className="row" style={{ align: 'center' }}>

                        <div className="col-lg-2">
                          <FacebookShareButton
                            url="https://www.facebook.in/"
                            title={"Checkout " + postdata.productName}
                            hashtag="#react"
                          >
                            <FacebookIcon
                              logofillColor="white"
                              round={true}
                            ></FacebookIcon>
                          </FacebookShareButton>
                        </div>
                        <div className="col-lg-2">
                          <WhatsappShareButton
                            url="https://www.whatsapp.in/"
                            title={"Checkout " + postdata.productName}
                            hashtag="#react"
                          >
                            <WhatsappIcon
                              logofillColor="white"
                              round={true}
                            ></WhatsappIcon>
                          </WhatsappShareButton>
                        </div>
                        <div className="col-lg-2">
                          <TwitterShareButton
                            url="https://www.twitter.in/"
                            title={"Checkout " + postdata.productName}
                            hashtag="#react"
                          >
                            <TwitterIcon
                              logofillColor="white"
                              round={true}
                            ></TwitterIcon>
                          </TwitterShareButton>
                        </div>
                      </div>
                      <div className="pt-2 ml-3" style={{float:'left'}}>
                        <button className="btn btn-danger text-uppercase" onClick={() => { addCart(postdata, postdata._id) }}>Add To Cart</button>&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-info text-uppercase ml-3">Rate Product</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div><br/>
              <hr/>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    {images.map((item) => (
                      <button
                        className="btn img-fluid"
                        width="100px"
                        height="400px"
                        onClick={() => setmainimage(item)}
                      >
                        {" "}
                        <img
                          src={item}
                          width="100px"
                          height="100px"
                          className="img-fluid"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <hr/>
              <h5 style={{float:'left'}}>Description</h5>
              <p style={{float:'left'}}>{postdata.productDescrip}</p>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ProductDetails;