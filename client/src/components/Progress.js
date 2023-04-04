import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Looper from './Looper';
// import logo from './imgg/RURUTEK - Logo Original.svg';
import ScrollToTop from "react-scroll-to-top";
import './Supremecommander.css'


export default function Progress() {
  const navigate = useNavigate()
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState([{}]);
  const [toggles, setToggles] = useState(false);
  const [progres, setProgres] = useState([])
  const { empid } = useParams();
  const today = new Date()
  var months = "0" + (today.getMonth() + 1);
  var monthcurrent = (today.getFullYear() + "-" + (months.slice(-2)));
  const [month, setMonth] = useState(monthcurrent)
  // let i = 1;
  const viewpage = `/view/${empid}`;
  const task = `/task/${user[0]?._id}/${user[0]?.department}`;
  const addtask = `/addtask/${user[0]?._id}/${empid}`;
  const [showmore, setShowmore] = useState(true)



  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {

    axios.get(`http://172.16.0.100:3001/getonereport/${empid}`).then((res) => { setProgres(res.data.user) })
  }, [empid])

  useEffect(() => {
    axios.get(`http://172.16.0.100:3001/singleuser/${empid}`).then(res => setUser(res.data.user))
  }, [empid])
  // console.log(user)
  return (
    <>
      {/* <header id="header" className={scroll?"fixed-top header-scrolled":"fixed-top"}> */}
      <header id="header" className="fixed-top header-scrolled">
        <div className="container d-flex align-items-center">
          {/* <h1 className="logo me-auto"><img src={logo} width='150px'></img></h1> */}
          <h1 className="logo me-auto"><a>RuruTask</a></h1>
          <nav id="navbar" className={toggles ? "navbar navbar-mobile" : "navbar"} >
            <ul>
              <li><a className="nav-link scrollto" href="#" onClick={() => navigate(-1)}>Back</a></li>
              {user[0].type==="manager"||user[0].type==="admin"?<li><a className="nav-link" href={task}>View Report</a></li>:<></>}
              <li><a className="nav-link" href={addtask}>Add Task</a></li>
              <li><a className="nav-link scrollto" href={viewpage}>View and Edit</a></li>

              <li><a className="getstarted scrollto" href="/" style={{textDecoration:'none'}}>Logout</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" onClick={(e) => { setToggles(!toggles) }} />
          </nav>
        </div>
      </header>
      <br></br>
      <main id="main">
        <section id="Report" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col-12">
                <div className="bg-light rounded h-100 p-4" >
                  <div className="section-title">
                    <h5 className="text-center">{user[0].name}</h5>
                  </div>
                  <div className='row skills' id="skills">
                    <div className="col-md-3 pt-4 pt-lg-0 content">
                      <input type="month" value={month} name="name" className="form-control" id="name" onChange={(e) => {setMonth(e.target.value)}} required />
                    </div>
                  </div>
                  <br></br>
                  <div className="row row-cards row-deck lol">
                    <div className="col-12">
                      <div className="card">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-outline table-vcenter  card-table">
                            <thead>
                              <tr style={{position:"sticky",top:"0"}}>
                                <th className="text-center">Date</th>
                                <th className="text-center">Work</th>
                                <th className="text-center">Task</th>
                                <th className="text-center">Progress</th>
                                <th className="text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody >

                              {user.map((userdatas, index) => <>

                                {progres.filter((getuser) =>
                                  new Date(getuser.date).getMonth() + 1 === new Date(month).getMonth() + 1
                                  && new Date(getuser.date).getFullYear() === new Date(month).getFullYear()
                                  && getuser.empid === userdatas.empid).sort((a, b) => new Date(a.date).getDate() > new Date(b.date).getDate() ? 1 : -1).map((prog, index) =>

                                    <>

                                      {prog.task.map((pro, index) =>

                                        <tr key={index}>
                                          <td className='text-center text-nowrap' >{index === 0 ? <>{new Date(prog.date).getDate() + "-" + (new Date(prog.date).getMonth() + 1)  +'-'+  new Date(prog.date).getFullYear()}</> : <></>}</td>
                                          <td className="text-wrap">{pro.work !== 'LEAVE'? pro.work :<span style={{color:'red'}}>{pro.work}</span>}</td>
                                          <td className="text-wrap">{pro.tasks !== 'LEAVE'? pro.tasks :<span style={{color:'red'}}>{pro.tasks}</span>}</td>
                                          <td className='text-center text-nowrap'>{pro.today_progress}%</td>
                                          <td className="text-nowrap" style={{ color: pro.today_progress === "100" ? "green" : "red", display: 'flex', justifyContent: "center", textAlign: "center" }} key={index}>{pro.tasks !== 'LEAVE'?<>{pro.today_progress === "100" ? <span>Completed</span> : <span>In Progress</span>}</>:<span>LEAVE</span>}</td>

                                        </tr>)}</>)}</>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScrollToTop smooth style={{ filter: "drop-shadow(2px 2px 1px  #47b2e4)" }} />
    </>
  )
}
