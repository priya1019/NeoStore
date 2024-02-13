const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 7890;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use('/uploads', express.static("uploads"));
const db = "mongodb://localhost:27017/E-commerce";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB Connected");
    }
    catch (err) {
        console.log(err.message);
    }
}
connectDB();
const userRoutes = require('./routes/user_routes.js');
app.use("/api/user/", userRoutes);
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Working on ${PORT}`);
})