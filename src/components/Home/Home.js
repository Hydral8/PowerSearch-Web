import React from "react";
import Navbar from "../Navbar/Navbar";
import { ReactComponent as ELLIPSEBG } from "../../assets/images/Ellipse-BG.svg";
import { ReactComponent as BG } from "../../assets/images/Basic-BG.svg";
import styles from "./home.module.scss";
import Container from "../Container/Container";
import { Header, P } from "../Typography/Typography";
import { GetStartedBtn } from "../Button/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className={styles.home} gap="2rem">
      <Navbar />
      <Container gap="2rem" align="center">
        <Header className={styles.heroTitle} color="white">
          Power Search
        </Header>
        <P color="white" className={styles.heroDescription}>
          The tool that powers through data to give you the insights you need.
        </P>
        <Link to="/signin">
          <GetStartedBtn>Get Started</GetStartedBtn>
        </Link>
      </Container>
    </Container>
  );
}

export default Home;
