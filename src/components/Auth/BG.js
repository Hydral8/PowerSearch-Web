import { Card, ContainedCard } from "../Card/Card";
import authStyles from "./auth.module.scss";

function BG({ children }) {
  return (
    <Card
      color="#E8F4FF"
      padding="2rem"
      className={authStyles.bg}
      style={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      gap="2rem"
      width="85%"
    >
      {children}
    </Card>
  );
}

function AuthCard({ children }) {
  return (
    <ContainedCard
      style={{
        height: "auto",
        width: "80%",
      }}
      gap={"5rem"}
    >
      {children}
    </ContainedCard>
  );
}

export { BG, AuthCard };
