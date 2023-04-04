import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from './imgg/RURUTEK - Logo Original.svg';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'

export default function Login() {
    const [scroll, setScroll] = useState(false);
    // const [toggles,setToggles] = useState(false); 
    const [empid,setEmpid] = useState('');
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
  

    const togglePassword = () => {
      if (type === 'password') {
        setIcon(eye)
;
        setType('text');
      }
      else {
        setIcon(eyeOff);
        setType('password');
      }
    }
 
    useEffect(() => {
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 50);
      });
    }, []);
    // function signup()
    // {
    //   navigate('/signup')
    // }
    
    function handleLogin(e)
    {
     e.preventDefault();
     const data = { empid: empid, password : password};
     axios.post('http://172.16.0.100:3001/login',data).then(res => res.data.message === "Successfully Login"? navigate(`/task/${res.data.user._id}/${res.data.user.department}`): alert('Wrong Credential'))
     
    }
  return (
    <div id='back' >
  <header id="header" className={scroll ? "fixed-top header-scrolled":"fixed-top"}>
    <div className="container d-flex align-items-center">
    <h1 className="logo me-auto"><img src={logo}  width='150px'></img></h1>
      <nav id="navbar" className="navbar" >
      <h1 className="logo"><a style={{fontSize:'23px'}}>RURUTASK</a></h1>
      </nav>
    </div>
  </header>
  <br/><br/>
  <main id="main">

  {/* <section id="hero" className="d-flex align-items-center"  > */}
    
    <div className="container">
      <div className="row my-4">



        <div className="col-lg-6 d-flex flex-column pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay={200}>
        <div  className="d-flex justify-content-center cont" data-aos="fade-up"> 
          <h1>Check out your daily task!!</h1>
          </div>
          <div  className="d-flex justify-content-center cont my-0" data-aos="fade-up"> 
          <h2 >Login to Continue...</h2>
          </div>
          
              
          <div  className="d-flex justify-content-center cont" data-aos="fade-up">
       
   
            <form  method="post" role="form" className="php-email-form" onSubmit = {handleLogin} >
            <div className="col my-2">
            <label htmlFor="name">Username</label>
              <div className="input-group">
                <input type="text" className="form-control" name="subject" id="subject" onChange={(e)=>setEmpid(e.target.value)} required />
              </div>
              </div>
              <div className="col">
              <label htmlFor="name" >Password</label>
              <div className=" input-group">
                          <input type={type} onChange={(e) => setPassword(e.target.value)} style={{border:'none'}} className="form-control" id="name"  />
                          <span className="input-group-text" style={{height:'35px'}} onClick={togglePassword}><Icon icon={icon} className="far"></Icon></span>
                        </div>

              </div>
              <div className='col my-4'>
              <div className="text-center"><button type="submit" style={{borderRadius:"4px"}}>Login</button></div>
              {/* <div className="text-center"><button type="button" onClick={signup}>Signup</button></div> */}
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-6 order-1 order-lg-2 hero-img my-4" data-aos="zoom-in" data-aos-delay={20}>
          <img src="assets/img/hero-img.png" className="img-fluid animated" alt="none" />
        </div>

      </div>
    </div>
  {/* </section> */}
  </main>
  
  </div>
  )
}
