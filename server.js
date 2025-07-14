
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('Mongo Connected'));

const Product = mongoose.model('Product', new mongoose.Schema({
    name:String, price:Number, image:String
}));

app.get('/api/products', async(req,res)=>{
    const products = await Product.find();
    res.json(products);
});

app.post('/api/add-product', async(req,res)=>{
    const {name, price, image, adminpass} = req.body;
    if(adminpass !== process.env.ADMIN_PASS) return res.json({message: 'Unauthorized'});
    await new Product({name,price,image}).save();
    res.json({message: 'Product Added'});
});

app.listen(3000, ()=>console.log('Server running'));
