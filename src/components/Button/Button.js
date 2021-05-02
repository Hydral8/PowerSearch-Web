import React from "react";
import { P } from "../Typography/Typography";
import styles from "./button.module.scss";

function GetStartedBtn({ children, style }) {
  return (
    <div className={styles.buttonRounded} style={style}>
      {children}
    </div>
  );
}

function Button({ children, style, onClick }) {
  return (
    <div className={styles.button} style={{ ...style }} onClick={onClick}>
      <P>{children}</P>
    </div>
  );
}

export { GetStartedBtn, Button };
