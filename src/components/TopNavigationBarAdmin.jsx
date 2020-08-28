import React,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import GradeIcon from '@material-ui/icons/Grade';

export default function TopNavigationBarAdmin({index}) {
  const [value, setValue] = useState(index);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className="app-bar-admin">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="primary"
        centered
      >
        <Tab label="tareas" component={Link} to="/maestra-adriana-tareas" className="labels" icon={<AssignmentIcon />}/>
        <Tab label="Tareas entregadas" component={Link} to="/maestra-adriana-tareas-entregadas"className="labels" icon={<AssignmentTurnedInIcon />}/>
        <Tab label="Calificaciones" component={Link} to="/maestra-adriana-calificaciones" className="labels" icon={<GradeIcon />}/>
      </Tabs>
    </Paper>
  );
}