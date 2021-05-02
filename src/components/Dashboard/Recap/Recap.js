import React from "react";
import { ContainedCard } from "../../Card/Card";
import Container from "../../Container/Container";
import { Header, P } from "../../Typography/Typography";
import { Summary } from "../Search/Search";
import scrollBarStyles from "../Scrollbar/scrollbar.module.scss";

function Recap({ width }) {
  let [todaysSummary, setTodaysSummary] = React.useState([
    "[https://www.google.com] a random piece of summary for today!",
  ]);
  for (let i = 0; i < 20; i++) {
    todaysSummary.push(todaysSummary[0]);
  }
  let [links, setLinks] = React.useState([
    "https://www.google.com",
    "https://www.medium.com",
  ]);
  // for (let i = 0; i < 20; i++) {
  //   links.push(links[1]);
  // }
  return (
    <Container gap="2rem" row style={{ flexGrow: 1 }}>
      <Container style={{ width: "65%", height: "100%" }}>
        <ContainedCard
          style={{
            flexGrow: 1,
            width: "100%",
          }}
          overflowY="scroll"
          className={scrollBarStyles.scrollbar}
          gap={"2.5rem"}
        >
          <Header style={{ alignSelf: "flex-start", fontSize: "1.875rem" }}>
            Summary of Information
          </Header>
          <Container>
            {todaysSummary.map((v, i) => (
              <Summary v={v} key={i} />
            ))}
          </Container>
        </ContainedCard>
      </Container>
      <Container style={{ flexGrow: 1 }}>
        <ContainedCard style={{ height: "30%" }}></ContainedCard>
        <ContainedCard
          style={{ flexGrow: 1 }}
          overflowY="scroll"
          className={scrollBarStyles.scrollbar}
          innerPaddingTop="2rem"
        >
          {links.map((v, i) => (
            <P key={i}>
              <a href={v} style={{ color: "#32A5E4" }}>
                {v}
              </a>
            </P>
          ))}
        </ContainedCard>
      </Container>
    </Container>
  );
}

export default Recap;
