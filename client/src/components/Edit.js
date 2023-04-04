import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import employee from './imgg/employe.jpg';
import axios from 'axios';
import bin from './imgg/bin.png';
import plus from './imgg/plus.png';


export default function Edit() {
  const navigate = useNavigate()
  const [toggles, setToggles] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState([{}]);
  const [users, setUsers] = useState("");
  const [datas, setDatas] = useState("")
  const { id } = useParams();
  const { empid } = useParams();
  const viewpage = `/view/${empid}`;
  const progresspage = `/progress/${user[0].empid}`;
  const tasks = `/task/${user[0]?._id}/${user[0]?.department}`;
  let notYesterday = new Date().setDate(new Date().getDate() - 2);
  let list = datas.task?.map((list, index) =>{return list;})



  // const [task, setTask] = useState(list)
  const [task, setTask] = useState(list)
  useEffect(() => { setTask(list)}, list )
  
 
 
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);
 


  function deleteTask(id,secondid) {
    return setTask(() => task.filter((pre) => pre._id !== id || pre.id !== secondid))
  }
  
    const handleTask = (event, i) => {
      event.preventDefault();
      const values = [...task];
      values[i][event.target.name] = event.target.value;
      setTask(values);
    };

    function addTask() {
      const added = {
        id: Math.floor(Math.random() * 1000),
        tasks: '',
        work:'',
        today_progress: 0
      }
      return setTask((prev) => [...prev, added])
    }

   






  useEffect(() => {
    axios.get(`http://172.16.0.100:3001/singleuser/${empid}/${id}`).then(res => setUser(res.data.user))
  }, [empid, id])

  useEffect(() => {
    axios.get(`http://172.16.0.100:3001/getonereportid/${id}`).then(res => setDatas(res.data.user))
  }, [])


  useEffect(() => {
    axios.get(`http://172.16.0.100:3001/singleuser/${empid}`).then(res => setUsers(res.data.user))
  }, [empid])
 

  const addtask = `/addtask/${users[0]?._id}/${empid}`;


  // const handleTask = (event, i) => {
  //   event.preventDefault();
  //   // console.log(list)
  //   list = list.map((x,index) => { 
  //     if(index === i) 
  //     { x[event.target.name] = event.target.value;}
      
  //     return x;
  //   });
  //   setTask(list);
  // };



  function handleSubmit() {
    let valuess=task.find((tas)=>{
      return tas.tasks==="" || tas.work===""||tas.today_progress===0
    })
   if(valuess) {
    alert("Remove Extra Task and then continue to Submit")
    }
    else {
      const tasks = JSON.stringify(task);
      
      axios.post(`http://172.16.0.100:3001/updatereport/${id}`, { task: tasks }).then(res => alert(res.data))

    }
  }



  function deleteid(id) {
    if (window.confirm("Are you sure to delete Task on"+ " "+datas.date)) {
      axios.delete(`http://172.16.0.100:3001/getonereport&delete/${id}`).then((res) => { alert(res.data) });
      navigate(-1)
    }
  }

  return (
    <div>
     
      <header id="header" className="fixed-top header-scrolled">
        <div className="container d-flex align-items-center">
       
          <h1 className="logo me-auto"><a>RuruTask</a></h1>
          <nav id="navbar" className={toggles ? "navbar navbar-mobile" : "navbar"} >
            <ul>
            
              <li><a className="nav-link scrollto" href="#" onClick={() => navigate(-1)}>Back</a></li>
              {user[0].type==="manager"||user[0].type==="admin"?<li><a className="nav-link" href={tasks}>View Report</a></li>:<></>}
              <li><a className="nav-link" href={addtask}>Add Task</a></li>
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

            <div id='whole' className="row member d-flex align-items-start mx-auto" data-aos="zoom-in" data-aos-delay={100}>
              <div className="row  d-flex align-items-center mx-auto">
                <div className="form-group col-lg-5 ">
                  <h1 className="logo " id='heading'><a style={{ color: '#37517e', fontSize: '25px' }}>EDIT YOUR RURUTASK</a></h1>
                </div>

                <div className="form-group col-lg-2">
                  <span>Date: {datas.date}</span>
                </div>
                <div className="form-group col-lg-1 my-1">
                <button type="button" className="btn" id="addtask" style={{ fontFamily: 'poppins' }} onClick={addTask} > <img src={plus} width='27px' ></img></button>
              </div>

                <div className="form-group col-lg-2 my-1">
                  <button type="button" id="deletetaskall" onClick={() => deleteid(id)} >Delete All</button>
                </div>
                <div className="form-group col-lg-2 my-1">

                  <button type="submit" id='submittask' className="btn" style={{ fontFamily: 'poppins' }} onClick={handleSubmit} disabled={task?.length===0}>Submit</button>
                </div>

              </div>

              <div className="pic col-5 mx-auto"><img src={employee} className="img-fluid" alt />
                <div>
                  <h4 style={{ textTransform: 'uppercase', fontFamily: 'poppins' }}>{user[0].name}</h4>
                  <span style={{ fontFamily: 'poppins' }}>{user[0].department} Team</span>
                </div>
              </div>


              <div id='overflowtry' className="member-info col-7 mx-auto " >


                <form role="form" className="php-email-form">
               
                  {task?.map((exp, index) => <>
                    <div className='row'>
                      <div className="form-group col-lg-12 my-2">

                        <input class="form-control" defaultValue={exp.work}  name="work" onChange={e => handleTask(e,index)} placeholder={`Edit today's Work ${index + 1}`} required></input>
                      </div>

                      <div class="form-group col-lg-12 my-2">

                        <textarea class="form-control" defaultValue={exp.tasks}  name="tasks" rows="4" placeholder={`Edit task ${index + 1}`} onChange={e => handleTask(e,index)} required></textarea>
                      </div>
                    </div>
                    <div className='row justify-content-between'>
                      <div class="form-group col-9 my-2">
                        <label for="name" style={{ fontFamily: 'poppins' }}>{exp.today_progress}% Progress </label>
                        <input type="range" name="today_progress" className="form-range" style={{ border: "none" }} defaultValue={exp.today_progress} onChange={e => handleTask(e,index)} required />
                       
                      </div>
                     
                      <div className="form-group col-3  my-2">
                      <button type="button" className='my-2' id="deletetask" onClick={() => deleteTask(exp._id,exp.id)}  > <img src={bin} width='27px' ></img> </button>
                    </div>
                    </div>
                  </>)}
                  
                </form>
              </div>

            </div>

          
          </div>
        </section>
      </main>

    </div>
  )
}

