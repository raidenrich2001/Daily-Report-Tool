import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import ScrollToTop from "react-scroll-to-top";
import Looper from './Looper';
import './Supremecommander.css'

export default function Supremecommander() {
    const { id } = useParams()
    const [is, setIs] = useState(true)
    const [department, setDepartment] = useState("")
    const [selectname, setSelectname] = useState('')
    const [all, setAll] = useState([]);
    const [toggles, setToggles] = useState(false);
    const [user, setUser] = useState([])
    const today = new Date()
    let departmentarray = []
    // const viewpage = `/view/${user.empid}`;
    // const progresspage = `/progress/${user.empid}`;
    // const addtask = `/addtask/${id}/${user.empid}`;

    var months = "0" + (today.getMonth() + 1);
  var monthcurrent = (today.getFullYear() + "-" + (months.slice(-2)));
    const [month, setMonth] = useState(monthcurrent);


    useEffect(() => {
        axios.get(`http://172.16.0.100:3001/singleuserusingid/${id}`).then(res => setUser(res.data.user))
    }, [id])



    useEffect(() => {
        axios.get('http://172.16.0.100:3001/getalluserwithreport').then(res => setAll(res.data))
    }, [id])

    function changes(e) {
        setSelectname(e.target.value)
        setIs(false)
    }

    function removeDuplicates(departmentarray) {
        return departmentarray.filter((item,
            index) => departmentarray.indexOf(item) === index);
    }

    return (
        <>
            <header id="header" className="fixed-top header-scrolled">
                <div className="container d-flex align-items-center">
                    <h1 className="logo me-auto"><a>RuruTask</a></h1>
                    <nav id="navbar" className={toggles ? "navbar navbar-mobile" : "navbar"} >
                        <ul>
                            <li style={{ color: "white" }}>Hey {user.name}..!</li>
                              {/* <li><a className="nav-link" href={addtask}>Add Task</a></li>
                            <li><a className="nav-link" href={viewpage}>View and Edit</a></li>
                            <li><a className="nav-link" href={progresspage}>View Progress</a></li> */}
                            <li><a className="getstarted scrollto" href="/" style={{textDecoration:'none'}}>Logout</a></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" onClick={(e) => { setToggles(!toggles) }} />
                    </nav>
                </div>
            </header>
            <br />

            <main id="main">
                <section id="Report" className="contact">
                    <div className="container" data-aos="fade-up">
                        <div className="row">
                            <div className="col-12">
                                <div className=" rounded h-100 p-4" style={{
                                    backgroundImage: "linear-gradient(to top right, #293c5d 60%, #37517e 70%)", borderRight: "3px solid #47b2e4",
                                    borderTop: "3px solid #47b2e4", borderBottom: "3px solid #47b2e4"
                                }}>
                                    <div className="section-title">
                                        <h5 className="text-center text-light">{user.department}</h5>
                                    </div>
                                    <div className='row skills' id="skills">
                                        <div className="col-md-4  content">

                                            <input type="month" value={month} name="name" className="form-control" id="name" onChange={(e) => setMonth(e.target.value)} required />
                                        </div>
                                        <div className="form-group col-md-4">

                                            {all.map((datas) => { departmentarray.push(datas.department) }
                                            )}
                                            <select className="form-control" name="name" id="name" value={department} onChange={(e) => setDepartment(e.target.value)} required style={{ fontWeight: "600" }}>
                                                <option >Department</option>
                                                {removeDuplicates(departmentarray).map((datas, index) => <>
                                                    {datas === "SCM" ? <></> : datas === "VP" ? <></> : <option key={index}>{datas}</option>}
                                                </>
                                                )}
                                            </select>

                                        </div>
                                        <div className="form-group col-md-4">
                                            <select className="form-control" name="name" id="name" value={selectname} onChange={changes} required style={{ fontWeight: "600" }}>
                                                <option >Employee</option>
                                                {all.filter((admin) => admin.department === department && admin.type !== "admin" && admin.type !== "manager").map((datas, index) => <>
                                                    <option key={index} >{datas.name}</option>
                                                </>
                                                )}
                                            </select>

                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row row-cards row-deck lol">
                                        <div className="col-12">
                                            <div className="card">
                                                <div classNAme="table-responsive">
                                                    <table className="table  table-bordered table-outline table-vcenter  card-table" >
                                                        <thead >
                                                            <tr style={{position:"sticky",top:"0"}}>
                                                                <th className="text-center">Date</th>
                                                                <th className="text-center">Work</th>
                                                                <th className="text-center">Task</th>
                                                                <th className="text-center">Progress</th>
                                                                <th className="text-center">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody >

                                                            {is ? <Looper /> :
                                                                all.map((userdatas, index) => <>

                                                                    {userdatas.reports.filter((getuser) =>
                                                                        new Date(getuser.date).getMonth() + 1 === new Date(month).getMonth() + 1
                                                                        && new Date(getuser.date).getFullYear() === new Date(month).getFullYear()
                                                                        && selectname === userdatas.name

                                                                        && getuser.empid === userdatas.empid).sort((a, b) => new Date(a.date).getDate() > new Date(b.date).getDate() ? 1 : -1).map((prog, index) =>

                                                                            <>
                                                                                {prog.task.map((pro, index) =>

                                                                                    <tr key={index}>
                                                                                        <td className='text-center text-nowrap' >{index === 0 ? <>{prog.date}</> : <></>}</td>
                                                                                        <td className="text-wrap">{pro.work}</td>
                                                                                        <td className="text-wrap">{pro.tasks}</td>
                                                                                        {/* <td>{pro.tasks.length > 80? <span>{pro.tasks.slice(0,80)}{showmore === pro.tasks.slice(80) ? showmore :<span onClick={()=>setShowmore(pro.tasks.slice(80))}  style={{color:"blue",cursor:"pointer",fontSize:"13px"}}>...readmore</span>}</span> : <span>{pro.tasks}</span> }</td> */}
                                                                                        <td className='text-center text-nowrap'>{pro.today_progress}%</td>
                                                                                        <td className="text-nowrap" style={{ color: pro.today_progress === "100" ? "green" : "red", display: 'flex', justifyContent: "center", textAlign: "center" }} key={index}> {pro.today_progress === "100" ? <span>Completed</span> : <span>In Progress</span>}</td>

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
