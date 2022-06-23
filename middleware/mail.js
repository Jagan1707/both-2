const nodemailer = require('nodemailer');
const SG = require('@sendgrid/mail');
const ejs = require('ejs')
const {join} = require('path');


// const transport = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         //user:'peakyblinders1tommy@gmail.com',
//         //pass:'tommy12345s'
//     }
// })
  
    SG.setApiKey('')

async function mailsending(mailDetails){
    
    try{
        let data = await ejs.renderFile(join(__dirname,'../view',mailDetails.filenNme),mailDetails,mailDetails.details)
        console.log('success')
        const mailData = {
            from : mailDetails.from,
            to : mailDetails.to,
            subject : mailDetails.subject,
            //text : mailDetails.text,
            html : data
        }
       // transport.sendMail(mailDetails,(err,data)=>{
       SG.send(mailData,(err,data)=>{
       if(err){
                console.log('err',err.message)
            }
            if(data){
                console.log("mail is sending!")
            }else{
                console.log("mail not sending!")
            }
        })
    }catch(err){
        console.log("err",err.message)
    }
}


async function forgetmail(mailDetails){
    
    try{
        console.log('success')
        
       // transport.sendMail(mailDetails,(err,data)=>{
       SG.send(mailDetails,(err,data)=>{
       if(err){
                console.log('err',err.message)
            }
            if(data){
                console.log("mail is sending!")
            }else{
                console.log("mail not sending!")
            }
        })
    }catch(err){
        console.log("err",err.message)
    }
}






module.exports = {
    mailsending , forgetmail
}
