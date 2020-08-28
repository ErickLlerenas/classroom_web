import React,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import GradeIcon from '@material-ui/icons/Grade';

export default function TopNavigationBar({index}) {
  const [value, setValue] = useState(index);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className="app-bar">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Tareas" component={Link} to="/tareas" className="labels" icon={<AssignmentIcon />}/>
        <Tab label="Tareas entregadas" component={Link} to="/tareas-entregadas"className="labels" icon={<AssignmentTurnedInIcon />}/>
        <Tab label="Calificaciones" component={Link} to="/calificaciones" className="labels" icon={<GradeIcon />}/>
      </Tabs>
    </Paper>
  );
}