import React, { useState, Fragment, useEffect } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { db } from "../firebase";
import { storage } from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TopNavigationBarAdmin from "../components/TopNavigationBarAdmin";
import LinearProgress from "@material-ui/core/LinearProgress";
import Swal from "sweetalert2";
import { useHistory, Redirect } from "react-router-dom";

export default function AdminNewTask() {
  let history = useHistory();
  const pass = localStorage.getItem("pass");
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [passWord, setPassWord] = useState(pass);
  const [date, setDate] = useState(null);
  const [ID, setID] = useState(0);
  const [files, setFiles] = useState({
    file: null,
    url: "",
  });

  useEffect(() => {
    const getPassWord = () => {
      if (passWord !== null) setPassWord(passWord);
    };
    getPassWord();
    getTasksLength();
  }, [passWord]);

  const handleDate = (date) => {
    setDate(date);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    history.push("/maestra-adriana-tareas");
  };

  const getTasksLength = () => {
    let temp = [];
    db.collection("tasks")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          temp.push(doc);
        });
        setID(temp.length);
      });
  };
  const addTask = async (url) => {
    setLoading(true);
    let temp = values;
    temp.deliveryDate = date;
    temp.id = ID.toString();
    if (url) temp.ref = url;
    addTaskstoStudents(temp);
    console.log("ID", ID.toString());
    await db
      .collection("tasks")
      .doc(ID.toString())
      .set(temp)
      .then(() => {
        Swal.fire({
          title: "¡Tarea creada con éxito!",
          text: "La tarea ha sido creada y enviada a los alumnos",
          icon: "success",
          confirmButtonText: "Regresar",
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

  const addTaskstoStudents = (temp) => {
    db.collection("students")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          getTask(doc.id.toUpperCase(), doc, temp);
        });
      });
  };

  const getTask = async (user, doc, temp) => {
    db.collection("students")
      .doc(user)
      .get()
      .then((data) => {
        if (data.data() !== undefined) {
          console.log(data.data().tasks);
          updateTask(doc.id.toUpperCase(), temp, data.data().tasks);
        }
      });
  };

  const updateTask = (user, temp, currentTask) => {
    let tempTask = [...currentTask];
    tempTask.push(temp);
    db.collection("students").doc(user).update({
      tasks: tempTask,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFiles({ file });
      console.log(file);
    }
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const { file } = files;
    if (file) {
      const uploadTask = storage.ref("tasks/" + file.name).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          Swal.fire({
            title: "No se ha podido subir el archivo",
            text: "Revisa tu conexión a internet",
            icon: "warning",
            confirmButtonText: "Reintentar",
          });
        },
        (complete) => {
          storage
            .ref("tasks")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              addTask(url);
            });
        }
      );
    } else {
      addTask();
    }
  };

  if (!passWord) return <Redirect to="/" />;

  return (
    <Fragment>
      <TopNavigationBarAdmin index={0} />
      <Container maxWidth="md">
        <Card className="responsive card">
          <h2>Nueva tarea</h2>
          <form onSubmit={uploadFile} autoComplete="off">
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
              placeholderText="Fecha de entrega *"
            />

            <label htmlFor="upload-file">
              <input
                style={{ display: "none" }}
                id="upload-file"
                name="upload-file"
                type="file"
                onChange={handleFileChange}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                className="add-file-btn"
                component="span"
              >
                {files.file ? files.file.name : "Agregar un archivo (Opcional)"}
              </Button>
            </label>
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Enlace (Opcional)"
              name="links"
              className="text-field"
              variant="outlined"
              type="url"
              onChange={handleChange}
            />

            <Container maxWidth="xs">
              {loading ? (
                <LinearProgress className="task-loading" color="primary" />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
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
