const express = require('express');
const router = express.Router();
const userModel = require("../models/userSchema");
const otpModel = require("../models/otpSchema");
const productModel = require("../models/productSchema")
const colorModel = require("../models/colorSchema");
const categoryModel = require("../models/categorySchema");
const orderModel = require("../models/orderSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";
const credentials = require('../configFiles/Credentials');
const multer = require("multer");
const path = require("path");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "./public/")))
//For Storing Profile Image in Database
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "E:/Campus to Corporate/Training/Assignment/neostore/public/Media");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
let upload = multer({
    storage: storage,
}).single('myFile')
//For Authentication By JWT
function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}
//For Posting Register Data in Database
router.post("/register", async (req, res) => {
    console.log(req.file);
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;
    let confpassword = req.body.confpassword;
    let mobile = req.body.mobile;
    let gender = req.body.gender;
    let dob = req.body.dob;
    let ins = new userModel({
        fname: fname, lname: lname, email: email, password: password,
        confpassword: confpassword, mobile: mobile, gender: gender, dob: dob, myFile:'neo.jpg'
    });
    const salt = await bcrypt.genSalt(10);
    ins.password = await bcrypt.hash(ins.password, salt);
    const user = await userModel.findOne({ email: email });
    if (user) {
        console.log("User exists")
        res.json({ err: "User Already Exists", })
    }
    else {
        ins.save((err) => {
            if (err) res.json({ err: "Something Went Wrong", })
            else { res.json({ msg: "Registered successfully" }) }
        })
    }
})
//For Storing Profile Image in Database
router.put("/upload/:id", upload, (req, res) => {
    let id = req.params.id;
    console.log(req.file);
    let myFile = (req.file) ? req.file.filename : null;
    userModel.updateOne({ _id: id }, { $set: { myFile: myFile } }, (err) => {
        if (err) {
            res.json({ err: err })
        } else {
            res.json({ msg: "successfully uploaded" })
        }
    })
})
//For Login Purpose
router.post("/login", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    const data = await userModel.findOne({ email: email })
    console.log(data);
    if (data) {
        const validPassword = await bcrypt.compare(password, data.password)
        if (validPassword) {
            let payload = {
                uid: email
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
            res.send({ msg: "Login Successful", "token": token, "data": data })
        } else {
            res.send({ err: "Password doesnt match" })
        }
    } else {
        res.send({ err: "User Not Registered" })
    }
})
//For login first for confirming order
router.get("/loginfirst", autenticateToken, (req, res) => {
    res.json({ "msg": "Token Matched" })
})
//For Getting Profile
router.get("/getprofile/:email", (req, res) => {
    let email = req.params.email;
    userModel.findOne({ email: email }, (err, data) => {
        if (err) res.json({ err: err })
        res.json({ user: data})
    })
})
//For Change Password
router.post("/changepassword/:id", async (req, res) => {
    console.log(req.body);
    let id = req.params.id;
    let password = req.body.password;
    let confpassword = req.body.confpassword;
    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, salt);
    userModel.updateOne({ _id: id }, {
        $set: {
            password: hashpassword,
            confpassword: confpassword
        }
    }, (err) => {
        if (err) res.json({ err: err });
        res.json({ msg: "Updated Succesfully" });
    })
})
//For Editing Profile
router.put("/editprofile/:id", async (req, res) => {
    let id = req.params.id;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let gender = req.body.gender;
    let dob = req.body.dob;
    userModel.updateOne({ _id: id }, {
        $set: {
            fname: fname, lname: lname, email: email,
            mobile: mobile, gender: gender, dob: dob
        }
    }, (err) => {
        if (err) res.json({ err: err });
        res.json({ msg: "Updated Succesfully" });
    })
})
//For Sending Otp in Database and Mail
router.post("/sendmailotp", async (req, res) => {
    console.log(req.body.email);
    let data = await userModel.findOne({ email: req.body.email });
    if (data) {
        let otpcode = Math.floor(1000 + Math.random() * 9000);
        let otpData = new otpModel({
            email: req.body.email,
            otpcode: otpcode,
            expiresIn: new Date().getTime() + 300 * 1000
        })
        let otpResponse = await otpData.save();
        sendmail(otpcode, req.body.email)
        res.json({ "msg": "Email Sent " })
    } else {
        res.json({ "msg": "Email ID doesnt Exist" });
    }
})
//For Changing Password
router.post("/forgotpassword", async (req, res) => {
    let email = req.body.email;
    let otpcode = req.body.otpcode
    const data = await otpModel.findOne({ otpcode: otpcode })
    if (data) {
        console.log(data);
        let currentTime = new Date().getTime();
        let diff = data.expiresIn - currentTime;
        if (diff < 0) {
            res.json({ "msg": "Token Expires" })
        } else {
            let user = await userModel.findOne({ email: email })
            user.password = req.body.password;
            user.confpassword = req.body.confpassword;
            const salt = await bcrypt.genSalt(10);
            let hashpassword = await bcrypt.hash(user.password, salt);
            user.password = hashpassword;
            user.save();
            res.json({ "msg": "Password Changed Successfully", err: 0 })
        }
    } else {
        res.json({ "msg": "Invalid Otp", err: 1 })
    }
})
//For Sending Mail Of OTP
const nodemailer = require("nodemailer");
function sendmail(otpcode, email) {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
            user: credentials.email,
            pass: credentials.password,
        }
    });
    let mailDetails = {
        from: credentials.email,
        to: `${email}`,
        subject: 'OTP for NeoSTORE',
        text: `YOUR OTP IS ${otpcode}`,
        html: `<html><body><h1>Neo<span style="color:red;">STORE</span></h1><h2>"For Reseting Your Password"</h2><h2>Your OTP Is : </h2> <h2>${otpcode}</h2> </body></html>`
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }s
    });
}
//For Getting Address
router.post('/getaddress', (req, res) => {
    userModel.findOne({ email: req.body.uid }, (err, data) => {
        if (err) {
            throw err;
        }
        else {
            res.json({
                "err": 0,
                "address": data.address,
            })
        }
    })
})
//For Adding Address
router.post("/addaddress", (req, res) => {
    console.log("address section")
    console.log(req.body)
    userModel.find({ email: req.body.email }, (err, data) => {
        if (err) {
            res.json({ err: 1, 'msg': "Unable to Add Address" })
        }
        else {
            let email = req.body.email;
            let address = req.body.address;
            let pincode = req.body.pincode;
            let city = req.body.city;
            let states = req.body.states;
            let country = req.body.country;
            let addressData = { Address_id: Math.random(), address: address, pincode: pincode, city: city, states: states, country: country }
            console.log(addressData)
            data[0].Address.push(addressData)
            console.log(data)
            userModel.updateOne({ email: email }, { $set: { Address: data[0].Address } }, (err, data) => {
                if (err) {
                    res.json({ 'err': 1, "msg": "Address Not Added" })
                }
                else {
                    res.json({ "err": 0, "msg": "Address added successfully", user_details: data });
                    console.log(data.Address)
                }
            })
        }
    })
})
//For Deleting Address
router.post("/deleteaddress/:email", (req, res) => {
    console.log("address delete section")
    console.log(req.body.Address_id)
    let email = req.params.email;
    let address_id = req.body.Address_id;

    userModel.find({ email: req.params.email }, (err, data) => {
        if (err) {
            res.json({ err: 1, 'msg': "Unable to delete Address" })
        }
        else {
            userModel.updateOne({ email: email }, { $pull: { Address: { Address_id: address_id } } }, (err) => {
                if (err) {
                    res.json({ 'err': 1, "msg": err })
                }
                else {
                    res.json({ "err": 0, "msg": "Address deleted successfully" });
                }
            })
        }
    })
})
// For Editing Address
router.post("/updateaddress", (req, res) => {
    console.log("address edit section")
    console.log(req.body)
    userModel.updateMany({}, { $set: { "Address.$[elem].address": req.body.address, "Address.$[elem].pincode": req.body.pincode, "Address.$[elem].city": req.body.city, "Address.$[elem].states": req.body.states, "Address.$[elem].country": req.body.country } }, { arrayFilters: [{ "elem.Address_id": req.body.Address_id }] }, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ err: 1, 'msg': "unable to Update address" })
        }
        else {

            userModel.find({ email: req.body.email }, (err, data) => {
                if (!data[0]) {
                    console.log('inside email not found');
                    res.json({ err: 1, "msg": "Unable to genrate jwt" })
                }
                else {
                    let payload = { uid: data }
                    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360 })
                    res.status(200).json({ "err": 0, "msg": "Address Updated Successfully", "token": token })
                }
            })
        }
    })
})
//For Getting All Products
router.get("/getproduct", (req, res) => {
    productModel.find()
        .populate(["categoryId", "colorId"])
        .then(product => {
            // console.log(product);
            res.json({ products: product })
        })
})
//For Getting Single Product
router.get("/singleproduct/:id", (req, res) => {
    let id = req.params.id
    productModel.findOne({ _id: id })
        .populate("colorId")
        .then(product => {
            console.log(product);
            res.json({ product: product, err: "0", image: product.subimages })
        })
})
//For Getting Catergory Products
router.get('/catproducts/:id', (req, res) => {
    let id = req.params.id
    console.log(id)
    const products = productModel.find({ 'categoryId': id })
        .populate(["categoryId", "colorId"])
    products.then(response => {
        res.json({ products: response })
    })
})
//For Getting Color Products
router.get('/colproducts/:id', (req, res) => {
    let id = req.params.id
    const products = productModel.find({ 'colorId': id })
        .populate(["categoryId", "colorId"])
    products.then(response => {
        res.json({ products: response })
    })
})
//For Getting Category
router.get('/category', (req, res) => {
    let category = categoryModel.find({})
    category.then(response => {
        res.json({ category: response })
    })
})
//For Getting Color
router.get('/color', (req, res) => {
    let colors = colorModel.find({})
    colors.then(response => {
        res.json({ colors: response })
    })
})
//For Adding Cart Details
router.post('/cartdetails', (req, res) => {
    let field = {
        Orderno: req.body.orderno,
        email: req.body.email,
        items: req.body.items,
        total: req.body.total,
    };
    console.log(field)
    let ins = new orderModel({ ...field });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.json({ "err": "Not Added" });
        } else {
            res.json({ flag: 1, msg: "Details Added" });
        }
    })
})
router.post("/cartaddress", (req, res) => {
    console.log("cartaddress");
    let email = req.body.email;
    orderModel.updateOne({ email: email, Orderno: req.body.orderno }, { $set: { "selectaddr": req.body.selectaddr } }, (err) => {
        if (err) res.json({ err: err });
        console.log("address added")
        res.json({ msg: "ORDER PLACED" });
    })
});
//For Getting Order Details
router.get("/getorder/:email", (req, res) => {
    
    let email = req.params.email;
    orderModel.find({ email: email }, (err, data) => {
        if (err) {
            throw err;
        }
        res.json({ user: data,item: data.items  })
        console.log(data.items)
    })
})

router.put("/stock/:id/:data", async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let stock = req.params.data;
    console.log(stock)
    productModel.updateOne({ _id: id }, {
        $set: { productStock:stock}
    }, (err) => {
        if (err){ res.json({ err: err })}else{
        res.json({ msg: "Updated Succesfully" })}
    })
})

// res.status(200).json({status:200, pdf: data, item: data.items })
//                 console.log(data.items)
//             }
//For Getting Invoice Pdf 
router.get("/pdf/:id", (req, res) => {
    let id = req.params.id
    console.log(id);
    orderModel.find({ _id: id })
        .then(data => {
            console.log(data);
            res.json({ pdf: data, item: data.items })
            console.log(data.items);
        })
})
module.exports = router;