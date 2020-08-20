import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";
import Task from "../components/Task";
import WhatsAppButton from "../components/WhatsAppButton";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    position:'fixed',
    width:'100%',
    bottom:0
  },
});

function Home() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Tareas pendientes" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Tareas entregadas" icon={<AssignmentTurnedInIcon />} />
        <BottomNavigationAction label="Calificaciones" icon={<FavoriteIcon />} />
      </BottomNavigation> 
      <WhatsAppButton />

    </Fragment>
  );
}

export default Home;
