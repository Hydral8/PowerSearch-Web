import React from "react";
import Container from "../Container/Container";
import Navbar from "../Navbar/Navbar";
import styles from "./dashboard.module.scss";
import DashboardMain from "./DashboardMain/DashboardMain";
import DashboardNav from "./DashNav/DashboardNav";

function Dashboard() {
  let [selected, setSelected] = React.useState(0);
  return (
    <div className={styles.dashboard}>
      <Navbar />
      <Container
        row
        justify="space-between"
        fullWidth
        className={styles.dashboardContainer}
        style={{ flexGrow: 1 }}
      >
        <DashboardNav selected={selected} setSelected={setSelected} />
        <DashboardMain selected={selected} />
      </Container>
    </div>
  );
}

export default Dashboard;
