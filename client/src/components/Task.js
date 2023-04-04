import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Admin from './Admin';
import './Task.css';
import Manager from './Manager';
import Supremecommander from './Supremecommander'
import User from './User';

export default function Task() {
  const [user, setUser] = useState('');
  const { id } = useParams();
  const [isUser,setisUser] = useState(false)


  // {isUser ? <User></User>:<Manager></Manager>} 

  // <button onClick={()=>setisUser(!isUser)}>Toggle User/Admin</button>
  useEffect(() => {
    axios.get(`http://172.16.0.100:3001/singleuserusingid/${id}`).then(res => setUser(res.data.user))
  }, [])

  if (user.length === 0) {
    return <h1>Error Page</h1>
  }
  else if (user.type === "admin") {
    return (
      <>
        <Admin></Admin>
      </>)
  }
  else if (user.type === "manager") {
    return (
      <div>
          <Manager></Manager>
        </div>)
  }
  else if (user.type === "supreme") {
    return (
      <>
        <Supremecommander></Supremecommander>
      </>)
  }

  else if (user.type !== "admin") {
    return (
      <User></User>
    )
  }
}