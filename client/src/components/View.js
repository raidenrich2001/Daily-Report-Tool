import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import imag from "./imgg/why-us.png";
import './View.css';
import edit from './imgg/edit.png';
import bin from './imgg/bin.png';

export default function View() {
  const { empid } = useParams();
  const [user, setUser] = useState("")
  const [toggles, setToggles] = useState(false);
  const navigate = useNavigate()
  const [taskviewandedit, setTaskviewandedit] = useState([{}])
  const progresspage = `/progress/${empid}`;
  const task = `/task/${user[0]?._id}/${user[0]?.department}`;



  useEffect(() => {
    axios.get(`http://172.16.0.100:3001/getonereport/${empid}`).then((res) => { setTaskviewandedit(res.data.user) })
  }, [empid])


  useEffect(() => {
    axios.get(`http://172.16.0.100:3001/singleuser/${empid}`).then(res => setUser(res.data.user))
  }, [empid])

  const addtask = `/addtask/${user[0]?._id}/${empid}`;


  let d = new Date();

  d.setDate(d.getDate() - 1);
  let i = 0, j = 0, k = 0;

  let showtwodaysonly = taskviewandedit.filter((dat) => {
    return new Date(dat.date).toLocaleDateString('en-US') === new Date().toLocaleDateString('en-US') || new Date(dat.date).toLocaleDateString('en-US') === new Date(d).toLocaleDateString('en-US')
  });


  function deleteid(id, date) {
    if (window.confirm(" Are you sure to delete Task on" + " " + date)) {
      axios.delete(`http://172.16.0.100:3001/getonereport&delete/${id}`).then((res) => { alert(res.data) });
      window.location.reload(false)
    }
  }

  return (
    <div >
      <header id="header" className="fixed-top header-scrolled">
        <div className="container d-flex align-items-center">

          <h1 className="logo me-auto"><a>RuruTask</a></h1>
          <nav id="navbar" className={toggles ? "navbar navbar-mobile" : "navbar"} >
            <ul>
              <li><a className="nav-link scrollto" href="#" onClick={() => navigate(-1)}>Back</a></li>
              {user[0]?.type === "manager" || user[0]?.type === "admin" ? <li><a className="nav-link" href={task}>View Report</a></li> : <></>}
              <li><a className="nav-link" href={addtask}>Add Task</a></li>
              <li><a className="nav-link scrollto" href={progresspage}>View Progress</a></li>
              <li><a className="getstarted scrollto" href="/" style={{ textDecoration: 'none' }}>Logout</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" onClick={(e) => { setToggles(!toggles) }} />
          </nav>
        </div>
      </header>
      <main id="main">
        <section id='view' className="why-us section-bg">
          <div className="container-fluid" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
                {showtwodaysonly.length !== 0 ? <div className="content">
                  <h3>You have completed below <strong> task</strong></h3><br /></div>
                  :
                  <>
                    <div className="content">
                      <h3>You haven't completed a <strong>TASK</strong></h3><br />
                    </div>
                    <div className="accordion-list">
                      <ul>
                        <li>
                          <a data-bs-toggle="collapse" className="collapse" data-bs-target="#accordion-list-1" style={{ textDecoration: 'none' }}> No Task Completed
                            <div className="form-group">
                            </div> <i className="bx bx-chevron-down icon-show" /><i className="bx bx-chevron-up icon-close" /></a>
                          <div id="accordion-list-1" className="collapse show" data-bs-parent=".accordion-list">

                            <p>
                              Complete a task to view here
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </>
                }
                <div className="accordion-list">
                  <ul>
                    {showtwodaysonly.sort((a, b) => new Date(a.date).getDate() > new Date(b.date).getDate() ? 1 : -1).map((view, index) =>
                    <>{view.task[0].work !== 'LEAVE'?
                      <li>


                        <a data-bs-toggle="collapse" className="collapse" data-bs-target="#accordion-list-1" style={{textDecoration:'none'}}> Task completed on {view.date}
                        {console.log(view.task[0].work)}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="updatetask" onClick={() => navigate(`/edit/${empid}/${view._id}`)}><img src={edit} width='27px' ></img></button>
                          <button type="button" id="deletetask" onClick={() => deleteid(view._id,view.date)} style={{ backgroundColor: "transparent", border: "none" }}><img src={bin} width='27px' ></img></button>
                          <i className="bx bx-chevron-down icon-show" />
                          <i className="bx bx-chevron-up icon-close" />
                        </a>


                        <div id="accordion-list-1" className="collapse show" data-bs-parent=".accordion-list">


                          {view.task.map((viewtask, index) => <>
                            <p style={{fontSize:"14px"}}><span style={{ color: "#37517e",fontSize:"14px" }}>{i = i + 1}.</span><span style={{fontSize:"14px"}}> Work</span>:&nbsp;{viewtask.work}</p>
                            <p  style={{fontSize:"14px"}} className='text-wrap'><span style={{ opacity: "0" }}>{j = j + 1}.</span><span style={{fontSize:"14px"}}>Task</span>:&nbsp;{viewtask.tasks}</p>
                            <p style={{fontSize:"14px"}}><span style={{ opacity: "0" }}>{k = k + 1}.</span><span style={{fontSize:"14px"}}>Progress</span>:&nbsp;{viewtask.today_progress}%</p>

                          </>)}<span style={{ display: "none" }}>{i = 0}{j = 0}{k = 0}</span>


                        </div>
                      </li>:<></>
                      }
                      </>
                      )
                      }
                  </ul>
                </div>
              </div>
              <div className="col-lg-5 align-items-stretch order-1 order-lg-2 img" style={{ backgroundImage: `url("${imag}")` }} data-aos="zoom-in" data-aos-delay={150}></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
