import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "../Button/Button";
import Container from "../Container/Container";
import Input from "../Input/Input";
import Navbar from "../Navbar/Navbar";
import { P } from "../Typography/Typography";
import authStyles from "./auth.module.scss";
import { AuthCard, BG } from "./BG";
import { SnackContext } from "../../contexts/snackbarcontext";
import { auth } from "../../services/Firebase";
import { UserContext } from "../../contexts/usercontext";

function handleSignin(email, password, history, setSnack, setUser) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((credential) => {
      setSnack({
        open: true,
        message: "Signed in!",
        severity: "success",
      });
      setUser(credential.user);
      history.push("/dashboard");
    })
    .catch((err) => {
      setSnack({
        open: true,
        message: err.message,
        severity: "error",
      });
    });
}

function Signin({ history }) {
  let { user, setUser } = useContext(UserContext);
  let { snack, setSnack } = useContext(SnackContext);
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  return (
    <div className={authStyles.authBG}>
      <Navbar />
      <BG>
        <AuthCard>
          <Container row justify="center" gap="3rem">
            <img
              src="https://picsum.photos/600/600"
              className={authStyles.pic}
            />
            <Container width="40%">
              <Input
                title="Email"
                width="100%"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                title="Password"
                width="100%"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Container>
          </Container>
          <Container>
            <Button
              style={{ width: "60%", alignSelf: "center" }}
              onClick={() =>
                handleSignin(email, password, history, setSnack, setUser)
              }
            >
              Sign In
            </Button>
            <P style={{ fontSize: "1rem", opacity: 0.6 }}>
              Or{" "}
              <Link to="/signup" className={authStyles.authLink}>
                Sign Up
              </Link>
            </P>
          </Container>
        </AuthCard>
      </BG>
    </div>
  );
}

export default withRouter(Signin);
