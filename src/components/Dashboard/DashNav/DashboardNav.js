import React from "react";
import { Card } from "../../Card/Card";
import styles from "./dashboardNav.module.scss";
import sharedStyles from "../shared.module.scss";

// ICONS
import { ReactComponent as Recap } from "../../../assets/icons/recap.svg";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { ReactComponent as Searches } from "../../../assets/icons/searches.svg";
import { ReactComponent as Settings } from "../../../assets/icons/settings.svg";
import Container from "../../Container/Container";
import { withRouter } from "react-router";

let icons = [
  { icon: Search, path: "" },
  { icon: Searches, path: "/searches" },
  { icon: Recap, path: "/recap" },
  { icon: Settings, path: "/settings" },
];

function DashboardNavBG({ children }) {
  return (
    <Card
      className={sharedStyles.bg}
      style={{ paddingBlock: "2rem" }}
      style={{ flexGrow: 1 }}
    >
      {children}
    </Card>
  );
}

function ProfileIcon({ firstname = "james", lastname = "Gordon" }) {
  let firstInitial = firstname[0];
  let lastInitial = lastname[0];
  return <div className={styles.profileicon}>{firstInitial + lastInitial}</div>;
}

function handleClick(v, history) {
  console.log(v);
  history.push("/dashboard" + v.path);
}

function DashboardNav({ selected, location, history }) {
  return (
    <DashboardNavBG>
      <ProfileIcon firstname="Alejandro Mur" lastname="Messuir" />
      <Container align="center" gap="3rem" style={{ marginTop: "5rem" }}>
        {icons.map((v, i) => (
          <v.icon
            key={i}
            id={i}
            onClick={() => handleClick(v, history)}
            fill={
              location.pathname == "/dashboard" + v.path ? "#FB6D3A" : "#7A67C7"
            }
            style={{
              cursor: "pointer",
            }}
          />
        ))}
      </Container>
    </DashboardNavBG>
  );
}

export default withRouter(DashboardNav);
