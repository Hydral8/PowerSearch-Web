import React, { useContext } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import History from "./services/History";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import Container from "./components/Container/Container";
import { Header } from "./components/Typography/Typography";
import { Snackbar, Alert } from "@material/react-snackbar";
import SnackbarContext, { SnackContext } from "./contexts/snackbarcontext";
import LiveSnackBar from "./components/LiveSnackBar";
import firebase, { db } from "./services/Firebase";
import UserContextProvider, { UserContext } from "./contexts/usercontext";

function RouteNotFound() {
  return (
    <Container>
      <Header>ROUTE WAS NOT FOUND. GO BACK</Header>
    </Container>
  );
}

function FunctionalApp() {
  let { user, setUser } = useContext(UserContext);
  return (
    <SnackbarContext>
      <Router history={History}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/dashboard"
            render={(props) =>
              user ? <Dashboard /> : <Redirect to="/signin" />
            }
          />
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="*" exact={true}>
            <RouteNotFound />
          </Route>
        </Switch>
      </Router>
      <LiveSnackBar />
    </SnackbarContext>
  );
}

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <FunctionalApp />
      </UserContextProvider>
    </div>
  );
}

export default App;
