import React, { Fragment, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import NewTaskButton from "../components/NewTaskButton";
import TopNavigationBarAdmin from "../components/TopNavigationBarAdmin";
import CircularProgress from "@material-ui/core/CircularProgress";
import TaskAdmin from "../components/TaskAdmin";
import { db } from "../firebase";
import {Redirect} from 'react-router-dom';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function AdminTasks() {
  const pass = localStorage.getItem('pass');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passWord,setPassWord] = useState(pass);

  useEffect(() => {
    const getPassWord = ()=>{
      if(passWord!==null)
      setPassWord(passWord);
    }
    getPassWord();
    getTasks();
  }, [passWord]);

  const getTasks = async () => {
    db.collection("tasks").onSnapshot((querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setTasks(temp.reverse());
      setLoading(false);
    });
  };
  
  if(!passWord) return <Redirect to="/"/>
  
  return (
    <Fragment>
      <TopNavigationBarAdmin index={0} />
      <Container maxWidth="md">
      <h2>¡Hola maestra Adriana!</h2>
        <p className="welcome">
          Estas son las tareas que ha creado.
          <span role="img" />
          😇
        </p>
        {loading && <CircularProgress className="circular-progress" />}
        {!loading && tasks.length===0 && <div>
          <ErrorOutlineIcon className="delivered-icon"/>
          <p className="center-text">No ha creado ninguna tarea todavía. Crea una nueva tarea.</p>
          </div>}
        {tasks.map((task) => (
          <TaskAdmin
            title={task.title}
            description={task.description}
            deliveryDate={task.deliveryDate}
            key={task.id}
            id={task.id}
            links={task.links}
            fileURL={task.ref}
          />
        ))}
      </Container>
      <NewTaskButton />
    </Fragment>
  );
}
