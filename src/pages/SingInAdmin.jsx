import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import bg from "../assets/teacher.svg";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function SignInAdmin() {
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const pass = e.target[0].value.toUpperCase();
    var docRef = db.collection("adriana").doc(pass);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        localStorage.setItem("pass", pass);
        history.push("/maestra-adriana-tareas");
      } else {
        Swal.fire({
          title: "¡Contraseña incorrecta!",
          text: "Intenta de nuevo con otra contraseña",
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
      <img src={bg} alt="background" className="responsive-img margin-top" />
      <h2>Buen día maestra Adriana</h2>
      <form onSubmit={handleSubmit}>
         <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          color="secondary"
          required
          id="password"
          type="password"
          label="Ingrese su contraseña"
          name="account"
          autoFocus
        />
        {loading ? (
          <LinearProgress className="entrar-loading" color="secondary"/>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
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
