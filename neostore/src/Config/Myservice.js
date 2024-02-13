import axios from 'axios';
import { MAIN_URL } from './Url';
let token = localStorage.getItem('_token');
//For Registration
export function registerUser(data) {
    return axios.post(`${MAIN_URL}user/register`, data);
}
//For Profile Image
export function uploadImage(id, formdata) {
    return axios.put(`${MAIN_URL}user/upload/${id}`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
}
//For Login
export function loginUser(data) {
    return axios.post(`${MAIN_URL}user/login`, data);
}
//For Getting Profile
export function getProfile(email) {
    return axios.get(`${MAIN_URL}user/getprofile/${email}`);
}
//For Change Password
export function changePassword(id, data) {
    return axios.post(`${MAIN_URL}user/changepassword/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
}
//For Editing Profile
export function editProfile(id, data) {
    return axios.put(`${MAIN_URL}user/editprofile/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}
//For Sending Email OTP
export function sendMailotp(data) {
    return axios.post(`${MAIN_URL}user/sendmailotp`, data)
}
//For Changing password When Forgot
export function forgotPassword(data) {
    return axios.post(`${MAIN_URL}user/forgotpassword`, data)
}
//For Adding Address
export function addAddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}user/addaddress`, data)
}
//For Getting Address
export function getAddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}user/getaddress`, data)
}
//For Editing Address
export function updateAddress(data) {
    console.log(data);
    return axios.post(`${MAIN_URL}user/updateaddress`, data)
}
//For Deleting Address
export function deleteAddress(email,data) {
    return axios.post(`${MAIN_URL}user/deleteaddress/${email}`, data)
}
//For Getting All Products
export function getProducts() {
    return axios.get(`${MAIN_URL}user/getproduct`, {
        header: { "Authorization": `Bearer ${token}` }
    })
}
//For Getting Single Prodcut
export function getSingleproduct(data) {
    return axios.get(`${MAIN_URL}user/singleproduct/` + data);
}
//For Getting Categories
export function getCategoriesProducts(id) {
    return axios.get(`${MAIN_URL}user/catproducts/${id}`);
}
//For Getting Colors
export function getColorsProducts(id) {
    return axios.get(`${MAIN_URL}user/colproducts/${id}`);
}
//For Getting Category Product 
export function allCategories() {
    return axios.get(`${MAIN_URL}user/category`);
}
//For Getting Color Product
export function allColors() {
    return axios.get(`${MAIN_URL}user/color`);
}
//For Adding Order Details
export function createOrders(checkout) {
    return axios.post(`${MAIN_URL}user/cartdetails`, checkout);
}
//After Login only 
export function authentication(token){
    return axios.get(`${MAIN_URL}user/loginfirst`,{
        headers : {"authorization":`Bearer ${token}`}
    })
}
//For Getting Cart Details
export function cartDetails( email) {
    return axios.get(`${MAIN_URL}user/getorder/${email}`)
}
export function stockProduct(id, data) {
    console.log(id);
    console.log(data);
    return axios.put(`${MAIN_URL}user/stock/${id}/${data}`, data)
}
//For Selecting Cart Address 
export function cartAddress(data){
    return axios.post(`${MAIN_URL}user/cartaddress`,data)
}
//For Showing Order Data
export function getPdf(data){
    console.log(data);
    return axios.get(`${MAIN_URL}user/pdf/` + data)
}