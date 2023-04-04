import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './Signup.css'

export default function Signup() {
    const navigate = useNavigate();
    const [toggles, setToggles] = useState(false);
    const [department,setDepartment] =useState();
    const [name,setName] = useState('');
    const [empid,setEmpid] = useState('');
    const [password,setPassword] = useState('')
    function handleSignup(e)
    {
     e.preventDefault();
     const data = { name:name, empid: empid, password : password, department : department};
     axios.post('http://172.16.0.100:3001/signup',data).then(res => res.data.message === "Added Successfully"? alert("Added Successfully"): alert(res.data.message)).then(navigate('/'))
    }
    console.log(department)
  return (
    <div>
 <header id="header" className="fixed-top header-scrolled">
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto"><a>RuruTask</a></h1>
          <nav id="navbar" className={toggles ? "navbar navbar-mobile" : "navbar"} >
            <ul>
              {/* <li><a className="nav-link scrollto" href='/'>Back to Login</a></li> */}
              {/* <li><a className="nav-link" href={progresspage}>View Progress</a></li> */}
              <li><a className="getstarted" href="/" style={{textDecoration:'none'}}>Back to Login</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" onClick={(e) => { setToggles(!toggles) }} />
          </nav>
        </div>
      </header>
<br></br>
 <section id="contact" className="contact">
  <div className="container" data-aos="fade-up">
    <div className="section-title">
      <h2>Signup</h2>
    </div>
    <div className="row">
      <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch mx-auto">
        <form role="form" className="php-email-form" onSubmit={handleSignup}>
          <div className="row">
            <div className="form-group col-md-6" >
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="form-control" id="name" onChange={(e)=>setName(e.target.value)}  required />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="name">Employee ID</label>
              <input type="text" className="form-control" name="name" id="name" onChange={(e)=>setEmpid(e.target.value)}  required />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Password</label>
              <input type="text" name="name" className="form-control" id="name" onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="name">Department</label><span><i className="bx bx-chevron-down icon-show" /></span>

              <select className="form-control" name="name" id="name" onChange={(e)=>setDepartment(e.target.value)}  required>
              <option>Software </option>
              <option>Hardware</option>
              <option>QC</option>
              <option>WebDevelopment</option>
              </select>
    
            </div>
          </div>
          {/* <div className="my-3">
            <div className="loading">Loading</div>
            <div className="error-message" />
            <div className="sent-message">Your message has been sent. Thank you!</div>
          </div> */}
          <div className="text-center"><button id ='signupbutton' type="submit">Sign Up</button></div>
        </form>
      </div>
    </div>
  </div>
</section>
</div>
  )
}
