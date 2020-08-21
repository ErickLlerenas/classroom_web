import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";


export default function TopNavigationBar() {
  const [value, setValue] = React.useState(0);

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
        <Tab label="Tareas pendientes" component={Link} to="/" className="labels"/>
        <Tab label="Tareas entregadas" component={Link} to="/tareas-entregadas"className="labels" />
        <Tab label="Calificaciones" component={Link} to="/calificaciones" className="labels"/>
      </Tabs>
    </Paper>
  );
}