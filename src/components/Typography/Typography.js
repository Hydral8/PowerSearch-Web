import React from "react";
import styles from "./typography.module.scss";

function P({ children, style, className, color }) {
  return (
    <p
      className={`${styles.paragraph} ${className}`}
      style={{ ...style, color }}
    >
      {children}
    </p>
  );
}

function Header({ style, children, className, color }) {
  return (
    <h1 className={`${styles.header} ${className}`} style={{ ...style, color }}>
      {children}
    </h1>
  );
}

function Title({ style, children, className, color }) {
  return (
    <h2 className={`${styles.title} ${className}`} style={{ ...style, color }}>
      {children}
    </h2>
  );
}

export { P, Header, Title };
