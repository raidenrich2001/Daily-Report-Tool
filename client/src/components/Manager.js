import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import ScrollToTop from "react-scroll-to-top";
import Looper from './Looper';
import './Supremecommander.css';
import Workbook from 'react-xlsx-workbook-dynamic-column-width';
import Modals from './Modals';
import Modals2 from './Modals2';

export default function Manager() {
    const [selectname, setSelectname] = useState('')
    const [is, setIs] = useState(true);
    // const navigate = useNavigate();
    const { id } = useParams()
    const { department } = useParams()
    const [all, setAll] = useState([])
    const [toggles, setToggles] = useState(false);
    const [user, setUser] = useState("")
    const [users, setUsers] = useState([])
    const [progress, setProgres] = useState([])
    const [newprogress, setNewProgres] = useState([])
    const tableRef = useRef(null);
    const today = new Date()
    var months = "0" + (today.getMonth() + 1);
    var monthcurrent = (today.getFullYear() + "-" + (months.slice(-2)));
    const [month, setMonth] = useState(monthcurrent);
    const viewpage = `/view/${user.empid}`;
    const progresspage = `/progress/${user.empid}`;
    const addtask = `/addtask/${id}/${user.empid}`;


    useEffect(() => {
        axios.get(`http://172.16.0.100:3001/getalluserwithreport`).then(res => setAll(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://172.16.0.100:3001/singleuserusingid/${id}`).then(res => setUser(res.data.user))
    }, [id])

    useEffect(() => {
        axios.get(`http://172.16.0.100:3001/getdepartmentreport/${id}/${department}`).then(res => setProgres(res.data.user))
    }, [id, department])

    useEffect(() => {
        axios.get(`http://172.16.0.100:3001/getdepartmentreport/${id}/${department}`).then(res => setNewProgres(res.data.user))
    }, [id, department])

    useEffect(() => {
        axios.get(`http://172.16.0.100:3001/getdepartmentuser/${id}/${department}`).then(res => setUsers(res.data.user))
    }, [id, department])

    function changes(e) {
        setSelectname(e.target.value)
        setIs(false)
    }
    var array = [];



    {
        users.map((userdatas, index) => {
            progress.filter((getuser, index) =>
                new Date(getuser.date).getMonth() + 1 === new Date(month).getMonth() + 1
                && new Date(getuser.date).getFullYear() === new Date(month).getFullYear()
                && getuser.empid === userdatas.empid)
                .sort((a, b) => new Date(a.date).getDate() > new Date(b.date).getDate() ? 1 : -1).map((prog, index) => { array.push(prog) }
                )
        })
    }


    var array2 = [];



    {
        all.map((userdatas, index) => {
            userdatas.reports.filter((getuser, index) =>
                new Date(getuser.date).getMonth() + 1 === new Date(month).getMonth() + 1
                && new Date(getuser.date).getFullYear() === new Date(month).getFullYear()
                // && selectname === userdatas.name
                && getuser.empid === userdatas.empid)
                .sort((a, b) => new Date(a.date).getDate() > new Date(b.date).getDate() ? 1 : -1).map((prog, index) => { array2.push(prog) }
                )
        })
    }

    var output = [];

    array.forEach(function (item) {
        var existing = output.filter(function (v, i) {
            return v.empid === item.empid;
        });

        if (existing.length) {
            var existingIndex = output.indexOf(existing[0]);
            output[existingIndex].task = output[existingIndex].task.concat(item.task);
        }

        else {
            if (typeof item.task == 'string')
                item.task = [item.task];
            output.push(item);

        }
    });


    var output2 = [];

    array2.forEach(function (item) {
        var existing = output2.filter(function (v, i) {
            return v.empid === item.empid;
        });

        if (existing.length) {
            var existingIndex = output2.indexOf(existing[0]);
            output2[existingIndex].task = output2[existingIndex].task.concat(item.task);
        }

        else {
            if (typeof item.task == 'string')
                item.task = [item.task];
            output2.push(item);

        }
    });

 
    const columnWidths = [
        { wch: 15 },
        { wch: 35 },
        { wch: 140 },
        { wch: 10 }
      ]

    return (
        <>

            <header id="header" className="fixed-top header-scrolled">
                <div className="container d-flex align-items-center">
                    <h1 className="logo me-auto"><a>RuruTask</a></h1>
                    <nav id="navbar" className={toggles ? "navbar navbar-mobile" : "navbar"} >
                        <ul>
                            <li style={{ color: "white" }}>Hey {user.name}..!</li>
                            <li><a className="nav-link" href={addtask}>Add Task</a></li>
                            {/* <li><a className="nav-link" href={viewpage}>View and Edit</a></li>
                            <li><a className="nav-link" href={progresspage}>View Progress</a></li> */}
                            <div class="dropdown">
                                <button class="btn btn-secondary " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "transparent", border: "none", margin: "4px" }}>
                                    View Team
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>{user.testing === "" ? <></> : <a className="nav-link scrollto" href={`/views/${user.testing}`}>{user.testing}</a>}</li>
                                    <li>{user.development === "" ? <></> : <a className="nav-link scrollto" href={`/views/${user.development}`}>{user.development}</a>}</li>
                                    <li>{user.designing === "" ? <></> : <a className="nav-link scrollto" href={`/views/${user.designing}`}>{user.designing}</a>}</li>
                                </ul>
                            </div>
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
                            <div className="col-12" >
                                <div className="bg-light rounded h-100 p-4" >
                                    <div className="section-title">
                                        <h5 className="text-center">{user.department} Team</h5>
                                    </div>
                                    <div className='row skills' id="skills">
                                        <div className="col-md-3  content">

                                            <input type="month" value={month} name="name" className="form-control" id="name" onChange={(e) => setMonth(e.target.value)} required />
                                        </div>
                                        <div className="form-group col-md-3">


                                            <select className="form-control" name="name" id="name" value={selectname} onChange={changes} required style={{ fontWeight: "600" }}>
                                                <option>Choose Employee</option>
                                                {users.map((datas, index) => <>
                                                    <option key={index}>{datas.name}</option>
                                                </>
                                                )}
                                            </select>

                                        </div>
                                        <div className="col-md-6 pt-lg-0  content">

                                            <Workbook filename={`All_Team_Report_${month}.xlsx`} element={<button className="btn btn-lg btn-success" style={{ fontSize: "16px", padding: "6px 14px", marginRight: "7px" }} >Download All</button>}>
                                                {output2.map((lol, index) =>
                                                    <Workbook.Sheet data={lol.task.filter((item, index) => lol.task.indexOf(item) === index)}  columsWidths={ columnWidths } name={lol.name}>
                                                        <Workbook.Column label="Date" value='dates' />
                                                        <Workbook.Column label="Work" value='work' />
                                                        <Workbook.Column label="Task" value='tasks' />
                                                        <Workbook.Column label="Progress" value='today_progress' />
                                                    </Workbook.Sheet>)}
                                            </Workbook>

                                            <Workbook filename={`${department}_Team_${month}.xlsx`} element={<button className="btn btn-lg btn-success" style={{ fontSize: "16px", padding: "6px 14px", marginRight: "7px" }} >&#10515; {department} Team</button>}>


                                                {output.map((lol, index) =>
                                                    <Workbook.Sheet data={lol.task.filter((item, index) => lol.task.indexOf(item) === index)} columsWidths={ columnWidths } name={lol.name}>
                                                        <Workbook.Column label="Date" value='dates' />
                                                        <Workbook.Column label="Work" value='work' />
                                                        <Workbook.Column label="Task" value='tasks' />
                                                        <Workbook.Column label="Progress" value='today_progress' />
                                                    </Workbook.Sheet>)}
                                            </Workbook>
                                            <DownloadTableExcel
                                                filename={selectname + " " + month}
                                                sheet={selectname}
                                                currentTableRef={tableRef.current}
                                            >
                                                <button className="btn btn-success">
                                                &#10515; Single </button>
                                            </DownloadTableExcel>
                                            <Modals2 names = {selectname} user ={users} report = {newprogress}></Modals2>
                                            <Modals names = {selectname} user ={users} report = {newprogress}></Modals>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row row-cards row-deck lol">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="table-responsive">
                                                    <table ref={tableRef} className="table table-bordered  table-outline table-vcenter  card-table">
                                                        <thead>
                                                            <tr style={{ position: "sticky", top: "0" }}>
                                                                <th className="text-center">Date</th>
                                                                <th className="text-center">Work</th>
                                                                <th className="text-center">Task</th>
                                                                <th className="text-center">Progress</th>
                                                                <th className="text-center">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {is ? <Looper /> : users.map((userdatas, index) => <>

                                                                {newprogress.filter((getuser) =>
                                                                    new Date(getuser.date).getMonth() + 1 === new Date(month).getMonth() + 1
                                                                    && new Date(getuser.date).getFullYear() === new Date(month).getFullYear()
                                                                    && selectname === userdatas.name

                                                                    && getuser.empid === userdatas.empid).sort((a, b) => new Date(a.date).getDate() > new Date(b.date).getDate() ? 1 : -1).map((prog, index) =>

                                                                        <>

                                                                            {prog.task.map((pro, index) =>

                                                                                <tr key={index}>
                                                                                       <td className='text-center text-nowrap' >{index === 0 ? <>{new Date(prog.date).getDate() + "-" + (new Date(prog.date).getMonth() + 1)  + '-' + new Date(prog.date).getFullYear()}</> : <></>}</td>
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
