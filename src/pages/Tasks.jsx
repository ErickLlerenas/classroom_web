import React, { Fragment, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import WhatsAppButton from "../components/WhatsAppButton";
import TopNavigationBar from "../components/TopNavigationBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Task from "../components/Task";
import { db } from "../firebase";
import {Redirect} from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Alert from '@material-ui/lab/Alert';
// import Button from '@material-ui/core/Button';

export default function Tasks() {
  const user = localStorage.getItem('userName');
  const [tasks,setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName,setUserName] = useState(user);
  const [open,setOpen] = useState(true);

  useEffect(() => {
    const getUserTasks = () => {
      db.collection("students").doc(userName).get().then((data)=>{
        if(data.data()!==undefined){
          setTasks(data.data().tasks.reverse());
          setLoading(false);
        }
      });
    };

    const getUser = ()=>{
      if(userName!==null)
      setUserName(titleCase(userName));
    }
    getUser();
    getUserTasks();
  }, [userName,tasks]);

  const titleCase = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };
  
  if(!userName) return <Redirect to="/"/>
  
  return (
    <Fragment>
      <TopNavigationBar index={0} />
      {open&&<Alert severity="warning" onClose={() => {setOpen(false)}}>Sube todas las fotos que se indican.</Alert>}
      <Container maxWidth="md">
  <h2>¡Hola {userName}!</h2>
        <p className="welcome">
          Estas son tus tareas por realizar.
          <span role="img" />
          😇
        </p>
        {loading && <CircularProgress className="circular-progress" />}
        {!loading && tasks.length===0 && <div>
          <AccessTimeIcon className="delivered-icon"/>
          <p className="center-text">¡Felicidades! No tienes ninguna tarea pendiente.</p>
          </div>}
        {tasks.map((task,index) => (
          <Task
            index={index}
            title={task.title}
            description={task.description}
            deliveryDate={task.deliveryDate}
            key={task.title}
            id={task.id}
            userName={userName}
            links={task.links}
            taskURL={task.ref}
          />
        ))}
      </Container>
      <WhatsAppButton userName={titleCase(userName)}/>
    </Fragment>
  );
}
