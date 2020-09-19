import React, { Fragment, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import WhatsAppButton from "../components/WhatsAppButton";
import TopNavigationBar from "../components/TopNavigationBar";
import { Redirect } from 'react-router-dom';
import { db } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import SentTask from "../components/sentTask";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function DoneTasks() {
  const user = localStorage.getItem("userName");
  const [userName, setUserName] = useState(user);
  const [doneTasks,setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDoneTasks = async () => {
      const docRef = db.collection("students").doc(userName);
      docRef.get().then((doc)=>{
        if(doc.exists){
          console.log(doc.data());
          setDoneTasks(doc.data().doneTasks.reverse());
          setLoading(false);
        }else{
          console.log(doc.exists)
        }
      })
    };
    const getUser = () => {
      if (userName !== null) setUserName(titleCase(userName));
    };
    getUser();
    if(userName)
    getDoneTasks();
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

  if(!userName) return <Redirect to="/"/>

  return (
    <Fragment>
      <TopNavigationBar index={1} />
      <Container maxWidth="md">
        <h2>¡Hola {userName}!</h2>
        <p className="welcome">
          Estas son tus tareas entregadas.
          <span role="img" />
          🥳
        </p>
        {loading && <CircularProgress className="circular-progress" />}
        {!loading && doneTasks.length===0 && <div>
          <ErrorOutlineIcon className="delivered-icon"/>
          <p className="center-text">No tienes ninguna tarea entregada todavía</p>
          </div>}
        {doneTasks.map((task)=>(
          <SentTask title={task.title} description={task.description} key={task.id} deliveryDate={task.deliveryDate} urls={task.ref} links={task.links}/>
        ))}
      </Container>
      <WhatsAppButton userName={titleCase(userName)}/>
    </Fragment>
  );
}
