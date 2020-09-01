import React from "react";
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignInAdmin from "./pages/SingInAdmin";
import Tasks from "./pages/Tasks";
import DoneTasks from "./pages/DoneTasks";
import AdminTasks from "./pages/AdminTasks";
import AdminNewTask from "./pages/AdminNewTask";
import AdminCalifications from "./pages/AdminCalifications";
import Califications from "./pages/Califications";
import AdminDoneTasks from "./pages/AdminDoneTasks";

export default function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/tareas" component={Tasks} />
          <Route exact path="/tareas-entregadas" component={DoneTasks} />
          <Route exact path="/calificaciones" component={Califications} />
          <Route exact path="/maestra-adriana" component={SignInAdmin} />
          <Route exact path="/maestra-adriana-tareas" component={AdminTasks} />
          <Route exact path="/maestra-adriana-nueva-tarea" component={AdminNewTask} />
          <Route exact path="/maestra-adriana-calificaciones" component={AdminCalifications} />
          <Route exact path="/maestra-adriana-tareas-entregadas" component={AdminDoneTasks} />
          <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </Switch>
      </Router>
  );
}
