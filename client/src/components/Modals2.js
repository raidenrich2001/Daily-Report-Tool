import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import { DownloadTableExcel } from "react-export-table-to-excel";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


export default function Modals2(props) {
  const [isShow, setIsShow] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const addDays = require('add-days');
  const tableRef = useRef(null);
  var dArray = [];

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate)
  }

  const selectionRange = {
    endDate: endDate,
    startDate: startDate,
    key: 'selection',
  }

  var nameselected = Object.values(props.user).filter((admin) => props.names === admin.name).map((datas, index) => { return datas });
  let reportselected = [];

  function getDate() {
    var cDate = startDate;
    while (cDate <= endDate) {
      dArray.push(new Date(cDate));
      cDate = addDays(cDate, 1);
    }
    return dArray;
  }
  getDate();

  dArray.map((lol) => (Object.values(props.report).filter((admin) => lol.toLocaleDateString() === admin.date && nameselected[0]?.name === admin.name).map((datas, index) => { reportselected.push(datas) })));

  const initModal = () => {
    return setIsShow(!isShow)
  }

  return (
    <>
      <button className='mx-2 btn btn-success' onClick={initModal}>&#10515; DateRange</button>
      <Modal show={isShow} onHide={initModal}>
        <Modal.Header>
          <Modal.Title>Select Dates for {props.names ? <span style={{ color: 'green' }}>{props.names} </span> : <span style={{ color: 'Red' }}>Choose Employee</span>}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='mx-3'> <div className="mx-5"><DateRange
          editableDateInputs={true}
          onChange={(ranges) => handleSelect(ranges)}
          moveRangeOnFirstSelection={false}
          ranges={[selectionRange]}
          showMonthAndYearPickers={true}
          dateDisplayFormat="d/M/yyyy"
        /> </div></Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={initModal}>Cancel</button>

          <DownloadTableExcel
            filename={props.names}
            sheet={props.names}
            currentTableRef={tableRef.current}
          >
            <button className="btn btn-primary" >Dowload</button>
          </DownloadTableExcel>

          <div className="row row-cards row-deck">
            <div className="col-12 p-1">
              <div className="card">
                <div className="table-responsive">
                  <table id="tbl1" ref={tableRef} className="table table-bordered table-hover table-outline table-vcenter text-nowrap card-table table2excel">
                    <thead>
                      <tr>
                        <th className="text-center">Date</th>
                        <th className="text-center">Work</th>
                        <th className="text-center">Task</th>
                        <th className="text-center">Progress</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportselected.map((prog, index) =>
                        prog.task.map((pro, index) =>
                          // console.log(pro)
                          <tr key={index}>

                            <td className='text-center text-wrap' >{index === 0 ? <>{new Date(prog.date).getDate() + "-" + (new Date(prog.date).getMonth()+1) + '-' + new Date(prog.date).getFullYear()}</> : <></>}</td>
                            <td className="text-wrap">{pro.work !== 'LEAVE' ? pro.work : <span style={{ color: 'red' }}>{pro.work}</span>}</td>
                            <td className="text-wrap">{pro.tasks !== 'LEAVE' ? pro.tasks : <span style={{ color: 'red' }}>{pro.tasks}</span>}</td>
                            <td className='text-center text-wrap'>{pro.today_progress}%</td>
                            <td className="text-wrap" style={{ color: pro.today_progress === "100" ? "green" : "red", display: 'flex', justifyContent: "center", textAlign: "center" }} key={index}>{pro.tasks !== 'LEAVE' ? <>{pro.today_progress === "100" ? <span>Completed</span> : <span>In Progress</span>}</> : <span>LEAVE</span>}</td>

                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </Modal.Footer>
      </Modal>
    </>
  )
}
