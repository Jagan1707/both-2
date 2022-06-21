const router = require('express').Router();
const userSchema = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {totp} = require('otplib');
const moment = require('moment')
const {forgetmail,mailsending} = require('../middleware/mail') 
const { updateOne } = require('../models/user.models');
const sms = require('fast-two-sms');
totp.options = { digits : 4 }


router.post('/Register',async(req,res)=>{
    try{
        let username = req.body.username
        let role  = req.body.role 
        let phone = req.body.phone
        let email = req.body. email 
        let address = req.body.address
     
        if(username){
            let nameData = await userSchema.findOne({"username":username}).exec();
            if(nameData){
                return res.status(400).json({'status':'failed', 'message':'user name already exist'})
            } 
        }else{
            return res.status(404).json({'status':'failed', 'message':'use another name'})
        }
    
        if(email){
            let emailData = await userSchema.findOne({'email':email}).exec();
            if(emailData){
                return res.status(400).json({"status":"failed", "message":"email id already exist"})
            }
        }else{
            return res.status(400).json({"status":"failed", "message":"use another Email id"})
        }
    
        if(phone){
            let numberData = await userSchema.findOne({"phone":phone}).exec();
            if(numberData){
                return res.status(400).json({"status":"failed", "message":"mobile number already exist"})
            }
        }else{
            return res.status(400).json({"status":"failed", "message":"use another Number"})
        }
        bcrypt.hash(req.body.password,10,function(err,hashcode){
            if(err){
                console.log("err",err.message)
            }
            console.log('done')
            let userData = new userSchema({
                username : username,
                role     : role,
                phone    : phone,
                email    : email,
                password : hashcode,
                address  : address,
            })

            console.log('name',userData.username);
            
            userData.save().then(data=>{
            //     let toMail = data.email
            //     let subject = "verify mail"
            //     let text = "hello "+data.username+" welcome"
                
            //     let mailDetails = {
            //        //from : 'peakyblinders1tommy@gmail.com',
            //         from : "jagan.platosys@gmail.com",
            //         to   : toMail,
            //         subject : subject,
            //         //text : text,
            //         filenNme : 'mail.ejs',
            //         details :{
            //             uuid:data.uuid,
            //             name : data.username
            //         }
            //     }
            //  let detail = mailsending(mailDetails);

             res.json({status:"success",message:"successfully register","result":data})
            })

        })
    }catch(err){
        console.log(err.message)
        res.json({'err':err.message})
    }
})

router.get('/:uuid',async(req,res)=>{
    try{
        await userSchema.findOneAndUpdate({uuid:req.params.uuid},{active:true}).then(data=>{
            console.log('success');
            res.send(`<center>
            <h1>Hello ${data.username} welcome</h1>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgX0TDHxP1NkHDATsBbYwCpd0p3O4bMmvxrw&usqp=CAU",width="250" height="250" />
            <h3>your account is activated</h3>
            <center/>`)
        })
    }catch(err){
        res.json({"err":err.message})
    }
 })


router.post('/Login',async(req,res)=>{
    try{
        let username = req.body.username
        let password = req.body.password
        const time = moment().toDate() 
         await userSchema.findOneAndUpdate({$or:[{phone:username},{email:username}]},{latestVisted:time,loginStatus:true}).then(data=>{
            bcrypt.compare(password,data.password,function(err,result){
                if(err){
                    res.json({"err":err.message})
                }
                if(result){
                   
                    const token = jwt.sign({uuid:data.uuid},"key",{expiresIn:'1d'}) 
                   
                    res.json({status:'success',"result":data,token})
                }else{
                   
                    res.json({status:'failure',message:'psssword is not matched!'})
                }
            })
         }).catch(err=>{
            res.json({status:'failure',message:'username not found please sign-up'})
        })

    }catch(err){
        console.log(err.message)
        res.json({'err':err.message})
    }
})

router.post('/forgetPassword',async(req,res)=>{
 try{
    const mail = req.query.mail;
    const sec = '5021';
    const digit = totp.generate(sec);
    console.log(digit);
    await userSchema.findOneAndUpdate({email:mail},{otp:digit},{new:true}).then(result=>{

        let msg ={
            authorization:'aaVv24VewoBzdfaPuCFkMEW8P4hWCZ8iMVq0V5BYSegy7E1bf0zgmgILHkEA',
            message : 'your reset password otp :'+digit,
            numbers : ["9092484971"]
            }
           sms.sendMessage(msg).then(mes=>{
            console.log("sms", mes)
           }).catch(err=>console.log(err.message))

                let toMail = result.email
                 let subject = "password-forgetmail"
                 let text = `Hello Your change password otp is : ${digit}`
                 let mailData = {
                    from : 'jagan.platosys@gmail.com',
                    to : toMail,
                    subject : subject ,
                    text : text
                 }

                 forgetmail(mailData)
         res.json({status:'success',message:'send otp your mail'})        
                 
    }).catch(err=>{
        console.log('mail address not valid')
        res.json({"err":err.message})
    })
 }catch(err){
    console.log(err.message)
    res.json({"err":err.message})
 }
})

router.post('/resetPassword',async(req,res)=>{
    try{
        bcrypt.hash(req.query.newPass,10,function(err,hashcode){
            if(err){
                console.log(err.message)
            }
            const otp = req.query.otp
            const newPass = hashcode
            console.log("pass",newPass)
         userSchema.findOneAndUpdate({otp:otp},{password:newPass},{new:true}).then(result=>{
           res.json({status:"success",message:"password successfully reseted!"})
           console.log("password successfully reseted!"); 
         }).catch(err=>{
            res.json({status:"failure",message:err.message})
         })
        })
    }catch(err){
        res.json({"err":err.message})
    }
})






module.exports = router