import React from "react";
import Container from "../Container/Container";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Header } from "../Typography/Typography";
import styles from "./navbar.module.scss";
import { GetStartedBtn } from "../Button/Button";

function Navbar({ user }) {
  user = true;
  return (
    <Container row className={styles.navbar}>
      <Container row gap="1rem" align="center">
        <Logo className={styles.logo} />
        <Header className={styles.logoText}>Power Search</Header>
      </Container>
      <GetStartedBtn style={{ visibility: user ? "hidden" : "visible" }}>
        Login
      </GetStartedBtn>
    </Container>
  );
}

export default Navbar;
