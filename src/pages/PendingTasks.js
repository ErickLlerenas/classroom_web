import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";
import Task from "../components/Task";

export default function PendingTasks() {
  return (
    <Fragment>
      <Container maxWidth="md">
        <h2>¡Hola Erick!</h2>
        <p className="welcome">Estas son tus tareas por realizar.</p>
        <Task />
        <Task />
        <Task />
        <Task />
      </Container>
    </Fragment>
  );
}

