import React, { useState, Fragment, useEffect } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { db } from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TopNavigationBarAdmin from "../components/TopNavigationBarAdmin";
import LinearProgress from "@material-ui/core/LinearProgress";
import Swal from "sweetalert2";
import { useHistory, Redirect } from "react-router-dom";

export default function AdminTasks() {
  let history = useHistory();
  const pass = localStorage.getItem("pass");
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [passWord, setPassWord] = useState(pass);
  const [date, setDate] = useState(null);
  useEffect(() => {
    const getPassWord = () => {
      if (passWord !== null) setPassWord(passWord);
    };
    getPassWord();
  }, [passWord]);

  const handleDate = (date) => {
    setDate(date);
  };
  const handleChange = (e) => {
    console.log(e.target.name, ":", e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    history.push("/maestra-adriana-tareas");
  };
  const addTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    let temp = values;
    temp.deliveryDate = date;
    await db
      .collection("tasks")
      .doc()
      .set(temp)
      .then(() => {
        Swal.fire({
          title: "¡Tarea creada con éxito!",
          text: "La tarea ha sido creada y enviada a los alumnos",
          icon: "success",
          confirmButtonText: "Okay",
          onClose: handleSubmit,
        });
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "¡Error al crear la tarea!",
          text: "Compruebe su conexión a internet",
          icon: "warning",
          confirmButtonText: "Reintentar",
        });
      });
  };

  if (!passWord) return <Redirect to="/" />;

  return (
    <Fragment>
      <TopNavigationBarAdmin index={0} />
      <Container maxWidth="md">
        <Card className="responsive card">
          <h2>Nueva tarea</h2>
          <form onSubmit={addTask}>
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Título"
              name="title"
              className="text-field"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Descripción"
              name="description"
              required
              className="text-field"
              variant="outlined"
              onChange={handleChange}
            />
            <DatePicker
              locale="es"
              selected={date}
              required
              name="deliveryDate"
              className="date-picker"
              onChange={handleDate}
              placeholderText="Fecha de entrega"
            />
            <br />
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Enlaces"
              name="links"
              className="text-field"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Archivos"
              name="files"
              className="text-field"
              variant="outlined"
              onChange={handleChange}
            />

            <Container maxWidth="xs">
              {loading ? (
                <LinearProgress className="task-loading" color="secondary" />
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  className="create-btn"
                >
                  Crear nueva tarea
                </Button>
              )}
            </Container>
          </form>
        </Card>
      </Container>
    </Fragment>
  );
}
