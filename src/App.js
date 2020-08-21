import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import WhatsAppButton from "./components/WhatsAppButton";
import PendingTasks from "./pages/PendingTasks";
import DoneTasks from "./pages/DoneTasks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BottomNagivationBar from './components/BottonNavigationBar';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PendingTasks} />
        <Route exact path="/iniciar-sesion" component={SignIn} />
        <Route exact path="/crear-cuenta" component={SignUp} />
        <Route exact path="/tareas-entregadas" component={DoneTasks} />
      </Switch>
      <BottomNagivationBar/>
      <WhatsAppButton />
    </Router>
  );
}
