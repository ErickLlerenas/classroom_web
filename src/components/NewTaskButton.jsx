import React from "react";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';

function NewTaskButton() {
  let history = useHistory();
  return (
    <Fab
      color="primary"
      className="fab new-task-btn"
      onClick={() => history.push("/maestra-adriana-nueva-tarea")}
    >
      <AddIcon fontSize="large" style={{ color: "white" }} />
    </Fab>
  );
}

export default NewTaskButton;
