import React from "react";
import { Button } from "../../Button/Button";
import { ContainedCard } from "../../Card/Card";
import Container from "../../Container/Container";
import { Header, P } from "../../Typography/Typography";
import { Keywords, Links, Summary } from "../Search/Search";
import scrollBarStyles from "../Scrollbar/scrollbar.module.scss";
import { withRouter } from "react-router";

const searchesData = [
  {
    query: "Vegetables in England",
    keywords: [
      { value: "vegetables", color: "#ff91ac" },
      { value: "england", color: "#fcf1bc" },
    ],
    links: [{ value: "https://www.bbc.com", color: "#aabc91" }],
    summaries: [
      "hello wlrd",
      "how are you",
      "[SOURCE] There are many different kinds of vegetables in England. Ranging from cucumbers to lettuce to beets to turnips there is almost every vegetable youc an think of available in England.",
      "[SOURCE] However, not all these vegetables have a positive effect on your health. In some case, these vegetables may have a NEGATIVE impact on your health. Dr. Maurie Schwartz discusses the implicatinos of pesticide usage on English vegetables ",
      "[SOURCE] this is a source material",
      "[SOURCE] this is a source material",
      "[SOURCE] this is a source material",
      "[SOURCE] this is a source material",
    ],
  },
  {
    query: "Vegetables in England",
    keywords: [
      { value: "vegetables", color: "#ff91ac" },
      { value: "england", color: "#fcf1bc" },
    ],
    links: [{ value: "https://www.bbc.com", color: "#aabc91" }],
    summaries: [
      "hello wlrd",
      "how are you",
      "[SOURCE] There are many different kinds of vegetables in England. Ranging from cucumbers to lettuce to beets to turnips there is almost every vegetable youc an think of available in England.",
      "[SOURCE] However, not all these vegetables have a positive effect on your health. In some case, these vegetables may have a NEGATIVE impact on your health. Dr. Maurie Schwartz discusses the implicatinos of pesticide usage on English vegetables ",
      "[SOURCE] this is a source material",
      "[SOURCE] this is a source material",
      "[SOURCE] this is a source material",
      "[SOURCE] this is a source material",
    ],
  },
];

function getMoreInformation(information, setInformation, history) {
  setInformation(information);
  console.log(history);
  history.push("/dashboard/");
}

function PastSearch({ information, setInformation, history }) {
  console.log(information);
  let summaryOverview = information.summaries[0];
  return (
    <ContainedCard
      style={{ height: "30rem", width: "40%", marginTop: "2rem" }}
      gap={"2.5rem"}
    >
      <Container gap="1.5rem">
        <Container row align="flex-start" justify="space-between">
          <Header style={{ alignSelf: "flex-start", fontSize: "1.875rem" }}>
            {information.query}
          </Header>
          <Button
            style={{ padding: "0.75rem 2rem" }}
            onClick={() =>
              getMoreInformation(information, setInformation, history)
            }
          >
            More
          </Button>
        </Container>
        <Container>
          <Keywords keywords={information.keywords} noMargin />
          <Links links={information.links} noMargin />
        </Container>
      </Container>
      <Container>
        <Summary v={summaryOverview} />
      </Container>
    </ContainedCard>
  );
}

function Searches({ searches, setInformation, history }) {
  searches = searchesData;
  return (
    <Container
      row
      style={{ flexWrap: "wrap", overflowY: "scroll", height: 0, flexGrow: 1 }}
      className={scrollBarStyles.scrollbar}
      justify="space-around"
    >
      {searches.map((search) => (
        <PastSearch
          information={search}
          setInformation={setInformation}
          history={history}
        />
      ))}
    </Container>
  );
}

export default withRouter(Searches);
