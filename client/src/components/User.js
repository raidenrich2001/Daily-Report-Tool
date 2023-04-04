import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Task.css';
import employee from './imgg/employee.jpg';
import bin from './imgg/bin.png';
import plus from './imgg/plus.png';
import logo from './imgg/RURUTEK - Logo Original.svg';

export default function User() {
    const [scroll, setScroll] = useState(false);
    const [toggles, setToggles] = useState(false);
    const [user, setUser] = useState('');
    const [dates, setDates] = useState(new Date().toISOString().substring(0, 10))
    const { id } = useParams();
    const navigate = useNavigate();
    const viewpage = `/view/${user.empid}`;
    const progresspage = `/progress/${user.empid}`;
    let notYesterday = new Date().setDate(new Date().getDate() - 2);

  
    function addTask() {
      const added = {
        id: Math.floor(Math.random() * 1000),
        tasks: '',
        work: '',
        dates: new Date(dates).toLocaleDateString('en-US'),
        today_progress: 0
      }
      return setTask((prev) => [...prev, added])
    }
    function deleteTask(id) {
      return setTask((prev) => {
        return prev.filter((pre) => pre.id !== id)
      })
    }

    
    const handleTask = (index, event) => {
      const values = [...task];
      values[index][event.target.name] = event.target.value;
      setTask(values);
    }


    useEffect(() => {
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 50);
      });
    }, []);


      
    const [task, setTask] = useState(
      [{
        id: Math.floor(Math.random() * 1000),
        tasks: '',
        work: '',
        dates: new Date(dates).toLocaleDateString('en-US'),
        today_progress: 0
      },{
        id: Math.floor(Math.random() * 1000),
        tasks: '',
        work: '',
        dates: new Date(dates).toLocaleDateString('en-US'),
        today_progress: 0
      }]
     
    )
    // console.log(task)
    function handleSubmit(e) {
      e.preventDefault();
      let valuess=task.find((tas)=>{
        return tas.tasks==="" || tas.work===""||tas.today_progress===0
      })
     if(valuess) {
      alert("Remove Extra Task and then continue to Submit")
      }
      else {
        task.map((lol,index)=>{ lol.dates = new Date(dates).toLocaleDateString('en-US');})
        var tasks = JSON.stringify(task);
        const taskdatas = {
          empid: user.empid,
          date: new Date(dates).toLocaleDateString('en-US'),
          name:user.name,
          department: user.department,
          task: tasks
        }
        axios.post('http://172.16.0.100:3001/task', taskdatas).then(res => res.data.message === 'Successfull' ? navigate(`/view/${res.data.report.empid}`) : alert(res.data.message))
      }
    }
  
    useEffect(() => {
      axios.get(`http://172.16.0.100:3001/singleuserusingid/${id}`).then(res => setUser(res.data.user))
    }, [])

  return (
    <div>
    <header id="header" className={scroll ? "fixed-top header-scrolled" : "fixed-top"}>
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto" > <img src={logo} width='150px'></img></h1>
        <nav id="navbar" className={toggles ? "navbar navbar-mobile" : "navbar"} >
          <ul>
            {/* <li><a className="nav-link scrollto" href="#Report">Go to Top</a></li> */}
            <li><a className="nav-link scrollto" href={viewpage}>View and Edit</a></li>
            <li><a className="nav-link" href={progresspage}>View Progress</a></li>
            <li><a className="getstarted" href="/" style={{textDecoration:'none'}}>Logout</a></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" onClick={(e) => { setToggles(!toggles) }} />
        </nav>
      </div>
    </header>

    <main id="main">
      <section id="hero" className="team section-bg my-5"  >
        <div className="container" data-aos="fade-up">






          <div id='whole' className="member row d-flex align-items-start mx-auto" data-aos="zoom-in" data-aos-delay={100}>
            <div className="row  d-flex align-items-center mx-auto">
              <div className="form-group col-lg-6 ">
                <h1 id='heading' className="logo "><a style={{ color: '#37517e', fontSize: '25px' }}>ENTER YOUR RURUTASK</a></h1>
              </div>

              <div className="form-group col-lg-3 my-1">
                {/* <label htmlFor="name">Date</label> */}
                <input type="date" name="name" className="form-control" value={dates} onChange={(e) => { setDates(e.target.value)}} id="name" required />
              </div>
              <div className="form-group col-lg-1 my-1">
                <button type="button" className="btn" id="addtask" style={{ fontFamily: 'poppins' }} onClick={addTask} > <img src={plus} width='27px' ></img></button>
              </div>
              <div className="form-group col-lg-2 my-1">

                <button type="submit" id='submittask' className="btn" style={{ fontFamily: 'poppins' }} onClick={handleSubmit} disabled={new Date(dates) > new Date() ||task.length===0}>Submit</button>
              </div>

            </div>
            {/* || new Date(dates) < new Date(notYesterday)  */}
            <div className="pic col-5 mx-auto"><img src={employee} className="img-fluid" alt />
              <div>
                <h4 style={{ textTransform: 'uppercase', fontFamily: 'poppins' }}>{user.name}</h4>
                <span style={{ fontFamily: 'poppins' }}>{user.department} Team</span>
              </div>
            </div>





            <div id='overflowtry' className="member-info col-7 mx-auto ">


              <form role="form" className="php-email-form">
                {task.map((exp, index) => <>
                  <div className='row'>
                    <div className="form-group col-lg-12 my-2">
                      {/* <label htmlFor="name" style={{fontFamily:'poppins'}}>Work</label> */}
                      <input class="form-control" value={exp.work} name="work" onChange={e => handleTask(index, e)} placeholder={`Enter today's Work ${index + 1}`} required></input>
                    </div>



                    <div class="form-group col-lg-12 my-2">
                      {/* <label htmlFor="name" style={{fontFamily:'poppins'}}>Task</label> */}
                      <textarea class="form-control" value={exp.tasks} name="tasks" rows="4" placeholder={`Enter task ${index + 1}`} onChange={e => handleTask(index, e)} required></textarea>
                    </div>
                  </div>
                  <div className='row justify-content-between'>
                    <div class="form-group col-9 my-2">
                      <label for="name" style={{ fontFamily: 'poppins' }}>{exp.today_progress}% Progress </label>
                      <input type="range" name="today_progress" className="form-range" style={{ border: "none" }} value={exp.today_progress} onChange={e => handleTask(index, e)} required />
                    </div>
                    <div className="form-group col-3  my-2">
                      <button type="button" className='my-2' id="deletetask" onClick={() => deleteTask(exp.id)}  > <img src={bin} width='27px' ></img> </button>

                    </div>
                  </div>
                </>)}
              </form>
            </div>

          </div>

          {/* </div> */}
        </div>
      </section>
    </main>

  </div>
  )
}
