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
import firebase, { auth } from "../../services/Firebase";
import { UserContext } from "../../contexts/usercontext";

function createAccount(
  firstname,
  lastname,
  email,
  password,
  school,
  profession,
  history,
  setSnack,
  setUser
) {
  if (
    firstname.trim() == "" ||
    lastname.trim() == "" ||
    email.trim() == "" ||
    password.trim() == "" ||
    school.trim() == "" ||
    profession.trim() == ""
  ) {
    return;
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      setSnack({
        open: true,
        message: "Account Created!",
        severity: "success",
      });
      setUser(credential.user);
      history.push("/dashboard");
    })
    .catch((err) => {
      console.log(err);
      setSnack({
        open: true,
        message: err.message,
        severity: "error",
      });
    });
  // firebase create account
}

function handleChange(setValue, setFirst, e) {
  setValue(e.target.value);
  setFirst(false);
}

function Signup({ history }) {
  let { user, setUser } = useContext(UserContext);
  let { snack, setSnack } = useContext(SnackContext);
  let [firstname, setFirstname] = React.useState("");
  let [firstFirstname, setfirstFirstname] = React.useState(true);
  let [lastname, setLastname] = React.useState("");
  let [firstLastname, setfirstLastname] = React.useState(true);
  let [email, setEmail] = React.useState("");
  let [firstEmail, setFirstEmail] = React.useState(true);
  let [password, setPassword] = React.useState("");
  let [firstPassword, setfirstPassword] = React.useState(true);
  let [school, setSchool] = React.useState("");
  let [firstSchool, setfirstSchool] = React.useState(true);
  let [profession, setProfession] = React.useState("");
  let [firstProfession, setfirstProfession] = React.useState(true);

  React.useEffect(() => {
    console.log(firstname);
  }, [firstname]);

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
                title="First Name"
                width="100%"
                borderColor={
                  firstname.trim() == "" && !firstFirstname
                    ? "#f54c36"
                    : "#8e9bff"
                }
                onChange={(e) =>
                  handleChange(setFirstname, setfirstFirstname, e)
                }
              />
              <Input
                title="Last Name"
                width="100%"
                borderColor={
                  lastname.trim() == "" && !firstLastname
                    ? "#f54c36"
                    : "#8e9bff"
                }
                onChange={(e) => handleChange(setLastname, setfirstLastname, e)}
              />
            </Container>
          </Container>
          <Container width="80%" style={{ alignSelf: "center" }}>
            <Container row justify="center" gap="2rem">
              <Input
                title="Email"
                width="100%"
                borderColor={
                  email.trim() == "" && !firstEmail ? "#f54c36" : "#8e9bff"
                }
                onChange={(e) => handleChange(setEmail, setFirstEmail, e)}
              />
              <Input
                title="Password"
                width="100%"
                borderColor={
                  password.trim() == "" && !firstPassword
                    ? "#f54c36"
                    : "#8e9bff"
                }
                onChange={(e) => handleChange(setPassword, setfirstPassword, e)}
              />
            </Container>
            <Container row justify="center" gap="2rem">
              <Input
                title="School"
                width="100%"
                borderColor={
                  school.trim() == "" && !firstSchool ? "#f54c36" : "#8e9bff"
                }
                onChange={(e) => handleChange(setSchool, setfirstSchool, e)}
              />
              <Input
                title="Profession"
                width="100%"
                borderColor={
                  profession.trim() == "" && !firstProfession
                    ? "#f54c36"
                    : "#8e9bff"
                }
                onChange={(e) =>
                  handleChange(setProfession, setfirstProfession, e)
                }
              />
            </Container>
            <Container
              row
              align="center"
              justify="flex-end"
              style={{ marginTop: "4rem" }}
            >
              <P style={{ fontSize: "1rem", opacity: 0.6 }}>
                Or{" "}
                <Link to="/signin" className={authStyles.authLink}>
                  Sign In
                </Link>
              </P>
              <Button
                style={{ width: "5rem", marginRight: "0.6125rem" }}
                onClick={() =>
                  createAccount(
                    firstname,
                    lastname,
                    email,
                    password,
                    school,
                    profession,
                    history,
                    setSnack,
                    setUser
                  )
                }
              >
                Sign Up
              </Button>
            </Container>
          </Container>
        </AuthCard>
      </BG>
    </div>
  );
}

export default withRouter(Signup);
