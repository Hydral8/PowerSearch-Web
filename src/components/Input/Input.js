import React from "react";
import { PaddingCard } from "../Card/Card";
import Container from "../Container/Container";
import styles from "./input.module.scss";
import { P } from "../Typography/Typography";

function Input({ width, style, title, onEnter, onChange, keep, borderColor }) {
  return (
    <Container gap="0.5rem" style={{ width, ...style }}>
      <P
        style={{
          fontWeight: "medium",
          alignSelf: "flex-start",
          paddingLeft: "0.6125rem",
        }}
      >
        {title}
      </P>
      <PaddingCard style={{}}>
        <input
          className={styles.input}
          style={{ border: borderColor ? `1px solid ${borderColor}` : null }}
          onKeyPress={(e) => {
            if (e.code == "Enter") {
              if (!onEnter) {
                return;
              }
              onEnter(e);
              if (!keep) {
                e.target.value = "";
              }
            }
          }}
          onChange={(e) => {
            if (!onChange) return;
            onChange(e);
          }}
        />
      </PaddingCard>
    </Container>
  );
}

export default Input;
