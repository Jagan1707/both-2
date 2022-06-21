const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userSchema = require('./routes/user.route')
const app = express();
app.use(cors());
app.use(express.json());


app.get('/',async(req,res)=>{
    console.log("its-worked")
    res.json({status:'success'})
})
app.set("view engine","ejs"); 

const DB = process.env.DBurl

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(base=>{
    console.log('database connected...')
}).catch(err=>{
    console.log('err',err.message);
})

app.use('/user',userSchema);


app.listen(8080,()=>{
    console.log(`server started 8080 port..` )
})

