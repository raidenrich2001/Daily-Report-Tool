import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import ScrollToTop from "react-scroll-to-top";
import Looper from './Looper';
import './Supremecommander.css'
import Workbook from 'react-xlsx-workbook-dynamic-column-width'
import Modals from './Modals';
import Modals2 from './Modals2';

export default function Departments() {
    const { department } = useParams();
    const [is, setIs] = useState(true);
    const [progress, setProgres] = useState([]);
    const [newprogress, setNewProgres] = useState([])
    const [users, setUsers] = useState([]);
    const [selectname, setSelectname] = useState('')
    const navigate = useNavigate();
    const [toggles, setToggles] = useState(false);
    const tableRef = useRef(null);
    const today = new Date()
    var months = "0" + (today.getMonth() + 1);
    var monthcurrent = (today.getFullYear() + "-" + (months.slice(-2)));
    const [month, setMonth] = useState(monthcurrent);
    const [showmore, setShowmore] = useState(true)
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

    const columnWidths = [
        { wch: 10 },
        { wch: 20 },
        { wch: 10 }
      ]


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


    var tablehelparray = [];

    useEffect(() => {
        axios.get(`http://172.16.0.100:3001/getdepartmentusers/${department}`).then(res => setUsers(res.data.user))
    }, [department])


    useEffect(() => {
        axios.get(`http://172.16.0.100:3001/getdepartmentreport/${department}`).then(res => setProgres(res.data.user))
    }, [department])

    useEffect(() => {
        axios.get(`http://172.16.0.100:3001/getdepartmentreport/${department}`).then(res => setNewProgres(res.data.user))
    }, [department])

    function changes(e) {
        setSelectname(e.target.value)
        setIs(false)
    }

//     {progress.map((out)=>
//         {users.filter((fil)=>
//             fil.empid===out.empid  ).map((put)=>{ tablehelparray.push(put.name)})})
        
//     }
//     let som=tablehelparray.filter((item, index) => tablehelparray.indexOf(item) === index)
// console.log(progress)
    return (
        <>
            <header id="header" className="fixed-top header-scrolled">
                <div className="container d-flex align-items-center">
                    <h1 className="logo me-auto"><a>RuruTask</a></h1>
                    <nav id="navbar" className={toggles ? "navbar navbar-mobile" : "navbar"} >
                        <ul>
                            <li><a className="nav-link scrollto" href="#" onClick={() => navigate(-1)}>Back</a></li>
                            {/* <li><a className="nav-link scrollto" href="#Report">Go to Top</a></li> */}
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
                                <div className="bg-light rounded h-100 p-4">
                                    <div className="section-title">
                                        <h5 className="text-center ">{department} Team</h5>
                                    </div>
                                    <div className='row skills' id="skills">
                                        <div className="col-md-3  content">
                                            {/* <label htmlFor="name" >Date</label> */}
                                            <input type="month" value={month} name="name" className="form-control" id="name" onChange={(e) => setMonth(e.target.value)} required />
                                        </div>
                                        <div className="form-group col-md-3">
                                            {/* <label htmlFor="name">Choose Employee</label><span><i  /></span> */}

                                            <select className="form-control" name="name" id="name" value={selectname} onChange={changes} required style={{ fontWeight: "600" }}>
                                                <option>Choose Employee</option>
                                                {users.map((datas, index) => <>
                                                    <option key={index}>{datas.name}</option>
                                                </>
                                                )}
                                            </select>

                                        </div>
                                        <div className="col-md-6 pt-lg-0  content">
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
                                            <Modals names = {selectname} user ={users} report ={newprogress}></Modals>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row row-cards row-deck lol">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="table-responsive">
                                                    <table ref={tableRef} className="table table-bordered  table-outline table-vcenter  card-table ">
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
