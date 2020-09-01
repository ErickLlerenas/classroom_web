import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import bg from "../assets/books.svg";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import LinearProgress from "@material-ui/core/LinearProgress";
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

export default function SignIn() {
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = e.target[0].value.toUpperCase();
    var docRef = db.collection("students").doc(user);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        localStorage.setItem("userName", user);
        history.push("/tareas");
      } else {
        Swal.fire({
          title: "¡Nombre incorrecto!",
          text: "Escribe tu nombre completo sin apellidos",
          icon: "warning",
          confirmButtonText: "Reintentar",
        });
      }
      setLoading(false);
    });
  };

  //For leak memory error cleanup
  useEffect(() => {
    setLoading(false);
  },[]);
  return (
    <Container maxWidth="xs">
       <IconButton color="secondary" aria-label="add an alarm" className="settings-icon" onClick={()=> history.push("/maestra-adriana")}>
        <SettingsIcon fontSize="large" />
      </IconButton>
      <img src={bg} alt="background" className="responsive-img margin-top" />
      <h2>Ingresa con tu nombre</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="account"
          label="Escribe tu nombre sin apellidos"
          name="account"
          autoFocus
        />
        {loading ? (
          <LinearProgress className="entrar-loading" />
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className="entrar"
          >
            Entrar
          </Button>
        )}
      </form>
    </Container>
  );
}
