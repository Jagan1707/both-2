import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';

const Login = ()=>{
    const [ mail, setMail] = useState('');
    const [password,setPassword] = useState('');
    const [log ,setlog] = useState('')

    const signin = () =>{
        let data = {
            username : mail,
            password :password
        }
        axios.post('http://localhost:8080/user/Login',data).then(result=>{
            console.log('data',result.data);
            console.log(JSON.stringify(result));
            console.log("jagn",result.data.status)
            setlog(result.data.status);
            if(log == 'success'){
                swal({
                    title: "LOGIN SUCCESS!",
                    text: "welcome",
                    icon: "success",
                    button: "OK",
                  });
            }else{
                swal("userName and password is Wrong!");
            }
        }).catch(err=>{
            console.log("err",err.message)
            
        })
    }
    
    
    
    return(
        <>
               <div className='con'>
        <div className=' center'>
            <div className='container aline'>
                <div className='img'>
                    <img src='https://images.theconversation.com/files/433956/original/file-20211125-23-vzbjao.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'/ >
                </div>
                
                
            <div className='right'>
            <h4>SIGN-IN</h4>
            <form> 
            
                <input type="email" className='form-control' placeholder='Email' onChange={(p)=>setMail(p.target.value)}  />
                <input type="password" className='form-control' placeholder='password' onChange={(p)=>setPassword(p.target.value)} />
                <p onClick={()=>window.location.href='/signup'}>Create New Account</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png" width="40"></img>
        <img src="https://image.similarpng.com/very-thumbnail/2020/12/Flat-design-Google-logo-design-Vector-PNG.png" width="40"></img><br></br>
                <button type="button" className='btn1' onClick={signin}>Login</button>
                
            </form>
            </div>
            </div>
            </div>
           
        </div>
        </>
    )
}

export default Login;