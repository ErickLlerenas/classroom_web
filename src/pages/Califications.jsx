import React, { Fragment, useState, useEffect } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import WhatsAppButton from "../components/WhatsAppButton";
import { Redirect } from "react-router-dom";
import { db } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Califications() {
  const user = localStorage.getItem("userName");
  const [userName, setUserName] = useState(user);
  const [califications, setCalifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = () => {
      if (userName !== null) setUserName(titleCase(userName));
    };
    const getCalifications = async () => {
      db.collection("students").onSnapshot((querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push({ ...doc.data(), id: titleCase(doc.id) });
          // initializeCalifications(doc.id.toUpperCase());
        });
        setCalifications(temp);
        setLoading(false);
      });
    };
    getUser();
    getCalifications();
  }, [userName]);

  // const initializeCalifications = (user)=>{
  //   db.collection("students").doc(user).update({
  //     calification:0,
  //     homework:0,
  //     participations:0,
  //     exam:0
  // })
  // }
  const titleCase = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };


  if (!userName) return <Redirect to="/" />;
  return (
    <Fragment>
      <TopNavigationBar index={2} />
      <Container maxWidth="md">
        <h2>¡Hola {userName}!</h2>
        <p className="welcome">
          Estas son las calificaciones.
          <span role="img" />
          🧐
        </p>
        {loading ? <CircularProgress className="circular-progress" />:
        <Card className="responsive card">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tareas</th>
                <th>Examen</th>
                <th>Participaciones</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {califications.map((calification) => (
                <tr key={calification.id}>
                  <td>{calification.id}</td>
                  <td>{calification.homework}</td>
                  <td>{calification.exam}</td>
                  <td>{calification.participations}</td>
                  <td>{calification.calification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>}
      </Container>
      <WhatsAppButton />
    </Fragment>
  );
}
