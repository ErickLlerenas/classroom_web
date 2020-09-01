import React, { Fragment, useState, useEffect } from "react";
import TopNavigationBarAdmin from "../components/TopNavigationBarAdmin";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import { db } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableInputs from "../components/TableInputs";

export default function AdminCalifications() {
  const user = localStorage.getItem("pass");
  const [passWord, setpassWord] = useState(user);
  const [califications, setCalifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = () => {
      if (passWord !== null) setpassWord(titleCase(passWord));
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
  }, [passWord]);

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

  if (!passWord) return <Redirect to="/" />;
  return (
    <Fragment>
      <TopNavigationBarAdmin index={2} />
      <Container maxWidth="md">
        <h2>¡Hola maestra Adriana!</h2>
        <p className="welcome">
          Estas son las calificaciones.
          <span role="img" />
          🧐
        </p>
        {loading ? (
          <CircularProgress className="circular-progress" />
        ) : (
          <Card className="responsive card">
            <form>
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
                    <TableInputs
                      calification={calification}
                      key={calification.id}
                    />
                  ))}
                </tbody>
              </table>
            </form>
          </Card>
        )}
      </Container>
    </Fragment>
  );
}
