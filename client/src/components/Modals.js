
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import axios from "axios";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


 function Modals(props) {
  const [isShow, setIsShow] = useState(false)
  const [dates, setDates] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const addDays = require('add-days');
  var dArray = new Array();
  var reportselected = [];
var formattedDarray = [];
const today = new Date();

function handleSelect(ranges) {
  setStartDate(ranges.selection.startDate);
  setEndDate(ranges.selection.endDate)
}

function deleteid(getreport) {
if(window.confirm(`Are You sure to delete task on ${formattedDarray}`))
   { getreport.map((req,index) => 
    axios.delete(`http://172.16.0.100:3001/getonereport&delete/${req._id}`).then((res) => { alert(res.data + ` for ${req.date}`) }).then((e) => window.location.reload(e))
    )}
}


const selectionRange = {
  endDate: endDate,
  startDate: startDate,
  key: 'selection',
}

let task = [{ tasks: 'LEAVE',
work: 'LEAVE',
today_progress: '0',}]


let nameselected =Object.values (props.user).filter((admin) => props.names === admin.name ).map((datas, index) => {return datas});


function getDate() {
  var cDate = startDate;
  while (cDate <= endDate) {
      dArray.push(new Date(cDate));
      formattedDarray.push(new Date(cDate).toLocaleDateString())
      cDate = addDays(cDate, 1);
  }
  return dArray;
}
getDate();

dArray.map((lol) => (Object.values(props.report).filter((admin) => lol.toLocaleDateString() === admin.date && nameselected[0]?.name === admin.name).map((datas, index) => {return reportselected.push(datas) })));


function handleSubmit(e) {
  e.preventDefault();
let taskdatas;
    const tasks = JSON.stringify(task);
    {nameselected.length !== 0 ? 
dArray.map((lol)=>
    {
      taskdatas = {
      empid: nameselected[0].empid,
      name: nameselected[0]?.name,
      date: new Date(lol).toLocaleDateString('en-US'),
      department: nameselected[0].department,
      task: tasks
    };
    axios.post('http://172.16.0.100:3001/task', taskdatas).then((res) => { alert(`Added leave for ${new Date(lol).toLocaleDateString('en-US')}`) }).then((e) => window.location.reload(e))
  }
    )
    :
    alert('Select Employee')}
}

 
  const initModal = () => {
    return setIsShow(!isShow)
  }

  return (
    <>
    <button className = 'btn btn-primary' onClick={initModal}>Pick Leave</button>
    <Modal show={isShow} onHide={initModal}>
      <Modal.Header>
        <Modal.Title>Select leave for {props.names?<span style={{color:'green'}}>{props.names} </span>  : <span style={{color:'Red'}}>Choose Employee</span>}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='mx-3'> <div className="mx-5"><DateRange 
        editableDateInputs={true}
        onChange={(ranges)=>handleSelect(ranges)}
        moveRangeOnFirstSelection={false}
        ranges={[selectionRange]}
        showMonthAndYearPickers={true}
        dateDisplayFormat="d/M/yyyy"
      /> </div></Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={(e) => deleteid(reportselected)}>Delete</button>
        <button className="btn btn-warning" onClick={(e) => window.location.reload(e)}>Reload</button>
        <button className="btn btn-secondary" onClick={initModal}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
      </Modal.Footer>
    </Modal>
    </>
  )
  }
  export default Modals;