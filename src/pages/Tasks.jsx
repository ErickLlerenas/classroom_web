import React, { Fragment, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import WhatsAppButton from "../components/WhatsAppButton";
import TopNavigationBar from "../components/TopNavigationBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Task from "../components/Task";
import { db } from "../firebase";
import {Redirect} from 'react-router-dom';

export default function Tasks() {
  const user = localStorage.getItem('userName');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName,setUserName] = useState(user);

  useEffect(() => {
    const getUser = ()=>{
      if(userName!==null)
      setUserName(titleCase(userName));
    }
    getUser();
    getTasks();
  }, [userName]);

  const titleCase = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  const getTasks = async () => {
    db.collection("tasks").onSnapshot((querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setTasks(temp);
      setLoading(false);
    });
  };
  
  if(!userName) return <Redirect to="/"/>
  
  return (
    <Fragment>
      <TopNavigationBar index={0} />
      <Container maxWidth="md">
  <h2>¡Hola {userName}!</h2>
        <p className="welcome">
          Estas son tus tareas por realizar.
          <span role="img" />
          😇
        </p>
        {loading && <CircularProgress className="circular-progress" />}
        {tasks.map((task) => (
          <Task
            title={task.title}
            description={task.description}
            uploadDate={task.uploadDate}
            key={task.id}
            id={task.id}
            userName={userName}
          />
        ))}
      </Container>
      <WhatsAppButton />
    </Fragment>
  );
}
