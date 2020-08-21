import React, { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function ButtonNavigationBar() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="bottom-navigation-bar"
    >
      <BottomNavigationAction
        label="Tareas pendientes"
        icon={<RestoreIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Tareas entregadas"
        icon={<AssignmentTurnedInIcon />}
        component={Link}
        to="/tareas-entregadas"
      />
      <BottomNavigationAction
        label="Calificaciones"
        icon={<FavoriteIcon />}
        component={Link}
        to="/calificaciones"
      />
    </BottomNavigation>
  );
}
