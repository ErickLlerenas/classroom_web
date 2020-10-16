import React, { Fragment, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import WhatsAppButton from "../components/WhatsAppButton";
import TopNavigationBar from "../components/TopNavigationBar";
import { Redirect } from 'react-router-dom';
import { db } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import SentTask from "../components/sentTask";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Alert from '@material-ui/lab/Alert';

export default function DoneTasks() {
  const user = localStorage.getItem("userName");
  const [userName, setUserName] = useState(user);
  const [doneTasks,setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open,setOpen] = useState(true);


  useEffect(() => {
    const getDoneTasks = async () => {
      const docRef = db.collection("students").doc(userName);
      docRef.get().then((doc)=>{
        if(doc.exists){
          setDoneTasks(doc.data().doneTasks);
          setLoading(false);
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
      {open&&<Alert severity="info" onClose={() => {setOpen(false)}}>Hola {userName}, ahora puedes volver a entregar tus tareas; sólamente eliminala presionando el ícono de basura y vuelvela a entregar.</Alert>}
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
        {doneTasks.map((task,index)=>(
          <SentTask title={task.title} description={task.description} key={task.id} deliveryDate={task.deliveryDate} urls={task.ref} links={task.links} id={task.id} index={index}/>
        ))}
      </Container>
      <WhatsAppButton userName={titleCase(userName)}/>
    </Fragment>
  );
}
