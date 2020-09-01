import React, { Fragment, useState, useEffect } from "react";
import TopNavigationBarAdmin from "../components/TopNavigationBarAdmin";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import { db } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoneTasksAdmin from "../components/DoneTasksAdmin";

export default function AdminDoneTasks() {
  const user = localStorage.getItem("pass");
  const [passWord, setpassWord] = useState(user);
  const [doneTasks, setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = () => {
      if (passWord !== null) setpassWord(titleCase(passWord));
    };
    const getTasks = async () => {
      await db.collection("tasks")
        .get()
        .then((querySnapshot) => {
          let temp = [];
          querySnapshot.forEach((doc) => {
            let data = { ...doc.data(), id: titleCase(doc.id), students: [] };
            checkIfStutendsMadeHomeWork(doc.id, temp, data);
          });
          setLoading(false);
        });
    };
    const checkIfStutendsMadeHomeWork = async (id, temp, data) => {
      await db
        .collection("students")
        .get()
        .then((query) => {
          query.forEach((student) => {
            student.data().doneTasks.forEach((task) => {
              if (task.id === id) {
                data.students.push({ name: student.id, ref: task.ref });
                console.log(
                  titleCase(student.id) + " Sí hizo la tarea" + task.ref
                );
              }
            });
          });
          temp.push(data);
          setDoneTasks([...temp]);
        });
    };
    getUser();
    getTasks();
  },[passWord]);

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
          Estas son las tareas entregadas.
          <span role="img" />
          🧐
        </p>
        {loading ? (
          <CircularProgress className="circular-progress" />
        ) : (
          doneTasks.map((tasks) => (
            <DoneTasksAdmin tasks={tasks} key={tasks.id} />
          ))
        )}
      </Container>
    </Fragment>
  );
}
