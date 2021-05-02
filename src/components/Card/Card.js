import React from "react";
import styles from "./card.module.scss";

function Card({ color, gap, children, width, padding, style, className }) {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={{
        backgroundColor: color,
        gap,
        width,
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ContainedCard({
  children,
  className,
  style,
  gap,
  overflowY,
  innerPaddingTop,
}) {
  return (
    <Card
      color="#F2F9FF"
      padding="0.6125rem"
      style={{ overflowY, height: 0, ...style }}
      className={className}
    >
      <Card
        style={{
          flexGrow: 1,
          paddingTop: innerPaddingTop,
        }}
        gap={gap}
      >
        {children}
      </Card>
    </Card>
  );
}

function PaddingCard({ children, style }) {
  return (
    <Card color="#F2F9FF" padding="0.6125rem" style={{ ...style }}>
      {children}
    </Card>
  );
}
export { Card, ContainedCard, PaddingCard };
