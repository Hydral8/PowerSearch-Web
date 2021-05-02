import React from "react";
import styles from "./container.module.scss";

function Container({
  row,
  gap,
  color,
  children,
  wrap,
  justify,
  align,
  fullWidth,
  width,
  style,
  className,
  ref,
}) {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        flexDirection: row ? "row" : "column",
        gap,
        color,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        width: fullWidth ? "100%" : width,
        ...style,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default Container;
