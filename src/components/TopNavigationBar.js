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
    <Paper className="">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Tareas pendientes" component={Link} to="/"/>
        <Tab label="Tareas entregadas" component={Link} to="/tareas-entregadas" />
        <Tab label="Calificaciones" component={Link} to="/calificaciones" />
      </Tabs>
    </Paper>
  );
}