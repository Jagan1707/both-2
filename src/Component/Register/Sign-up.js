import React,{useState} from 'react'
//<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"/>
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './Style.css'
import axios from 'axios'
import 'react-router-dom'

const Register = () =>{
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const signup = async() =>{
        let data = {
            username: name,
            phone : phone,
            email : mail,
            password : password,
        }
       await axios.post('http://localhost:8080/user/Register',data).then(userData=>{
        console.log("data",userData)
        console.log('result',JSON.stringify(userData));
       }).catch(err=>{
        console.log('err',err.message)
       })
    }

   
    var nameerr = document.getElementById('name-err');
    var mailerr = document.getElementById('mail-err');
    var phoneerr = document.getElementById('phone-err');
    var passworderr = document.getElementById('pass-err');
    

    const rection = () =>{
 try {
   
    var username = /^[\D ]{3,8}$/;
    var email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    var mobile = /^(0|91)?[6-9][0-9]{9}$/
    var pass = /^[\w]{6,8}$/
    var validName = username.test(name);
    var validMail = email.test(mail)
    var validphone = mobile.test(phone)
    var validpassword = pass.test(password)
    validName ?  nameerr.style.display = 'none' : nameerr.style.display = 'block';
    validMail ?  mailerr.style.display = 'none' : mailerr.style.display = 'block';
    validphone ?  phoneerr.style.display = 'none' : phoneerr.style.display = 'block';
    validpassword ?  passworderr.style.display = 'none' : passworderr.style.display = 'block';
 } catch (error) {
    console.log('err',error.message)
 }
      }
     rection();
    
      

    return(
        <>
        <div className='con'>
        <div className=' center'>
            <div className='container aline'>
                <div className='img'>
                    <img src='https://images.theconversation.com/files/433956/original/file-20211125-23-vzbjao.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'/ >
                </div>
                
            <div className='right'>
            <h4>SIGN-UP</h4>
            <form> 
            
                <input type="text" className='form-control' placeholder='username' onChange={(p)=>setName(p.target.value)} />
                <p id='name-err' >username is not valid!</p>
                <input type="email" id='username' className='form-control' placeholder='Email' onChange={(p)=>setMail(p.target.value)} />
                <p id='mail-err'> mail addres not valid!</p>
                <input type="text" className='form-control' placeholder='Mobile Number'onChange={(p)=>setPhone(p.target.value)} />
                <p id='phone-err'> mobile not valid not valid!</p>
                <input type="password"  className='form-control' placeholder='password' onChange={(p)=>setPassword(p.target.value)} />
                <p id='pass-err'> password must be six letter!</p>
                 {/* <input type="password" className='form-control' placeholder='comform password' onChange={(p)=>setPassword(p.target.value)} /> 
                 <textarea className='form-control' placeholder='Address' /> */}
                 <p onClick={()=>window.location.href='/login'}>Login here</p>
                 <button type='button' className='btn' onClick={signup}> Register</button>
                 
                
            </form>
            </div>
            </div>
            </div>
           
        </div>
        </>
    )
}

export default Register