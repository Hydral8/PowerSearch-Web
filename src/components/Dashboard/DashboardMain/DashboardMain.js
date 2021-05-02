import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { Card } from "../../Card/Card";
import Container from "../../Container/Container";
import { Header } from "../../Typography/Typography";
import Recap from "../Recap/Recap";
import { Search } from "../Search/Search";
import Searches from "../Searches/Searches";
import Settings from "../Settings/Settings";
import sharedStyles from "../shared.module.scss";

function DashboardMainBG({ children }) {
  return (
    <Card
      color="#E8F4FF"
      padding="2rem"
      className={sharedStyles.bg}
      style={{ flexGrow: 1 }}
      gap="2rem"
      width="85%"
    >
      {children}
    </Card>
  );
}

let components = [
  { component: Search, title: "Power Search", path: "" },
  { component: Searches, title: "Searches", path: "/searches" },
  { component: Recap, title: "Recap", path: "/recap" },
  { component: Settings, title: "Settings", path: "/settings" },
];

function RouteNotFound() {
  return (
    <Container>
      <Header>Uh oh. Looks like you're in the wrong section!</Header>
    </Container>
  );
}

function DashboardMain({ selected, location }) {
  let [information, setInformation] = React.useState({
    links: [],
    summaries: [],
    keywords: [],
  });
  let current = components.find(
    (v) =>
      "/dashboard" + v.path == location.pathname ||
      "/dashboard/" + v.path == location.pathname
  );
  return (
    <DashboardMainBG>
      <Container row>
        <Header>{current ? current.title : ""}</Header>
      </Container>
      <Switch>
        {components.map((v) => (
          <Route exact path={"/dashboard" + v.path}>
            <v.component
              information={information}
              setInformation={setInformation}
            />
          </Route>
        ))}
        <Route path="/dashboard/*" exact>
          <RouteNotFound />
        </Route>
      </Switch>
    </DashboardMainBG>
  );
}
export default withRouter(DashboardMain);
