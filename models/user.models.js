const mongoose = require('mongoose');
const crypto = require('crypto');


const userSchema = mongoose.Schema({
    uuid : {type:String , require:false},
    username : {type:String, require:true},
    role : {type:String,enum:['admin','user'],require:false,default:'user'},
    phone : {type:String,require:true},
    email : {type:String,require:true},
    password : {type:String,require:true},
    active : {type:Boolean,require:false,default:false},
    address:{type:String,require:false},
    latestVisted:{type:String,require:false},
    loginStatus:{type:Boolean,require:false},
    otp:{type:String,require:false}

},{
    timestamps:true
})


userSchema.pre('save',function(next){
    this.uuid = "USE"+crypto.pseudoRandomBytes(4).toString('hex').toUpperCase();
    console.log("uuid",this.uuid);
    next();
})
module.exports = mongoose.model('person',userSchema);