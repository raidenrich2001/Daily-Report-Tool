import Login from "./components/Login";
import Progress from "./components/Progress";
import Task from "./components/Task";
import View from "./components/View";
import {Routes ,Route} from 'react-router-dom';
// import Error from "./components/Error";
import Edit from "./components/Edit";
import Admin from "./components/Admin";
import Signup from "./components/Signup";
import Departments from "./components/Departments";
import Addtask from "./components/Addtask";

function App() {
  return (
<>
<Routes>
<Route path='/' element ={<Login></Login>}></Route>
<Route path='/signup' element ={<Signup></Signup>}></Route>
<Route path='/task/:id/:department' element ={<Task></Task>}></Route>
<Route path='/addtask/:id/:empid' element ={<Addtask></Addtask>}></Route>
<Route path='/views/:department' element ={<Departments></Departments>}></Route>
<Route path='/view/:empid' element ={<View></View>}></Route>
<Route path='/edit/:empid/:id' element ={<Edit></Edit>}></Route>
<Route path='/progress/:empid' element ={<Progress></Progress>}></Route>
<Route path='/admin' element ={<Admin></Admin>}></Route>
</Routes>

</>
  );
}

export default App;
