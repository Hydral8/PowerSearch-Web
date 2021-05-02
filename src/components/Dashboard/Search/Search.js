import React from "react";
import { Button } from "../../Button/Button";
import { ContainedCard } from "../../Card/Card";
import Container from "../../Container/Container";
import Input from "../../Input/Input";
import { Header, P } from "../../Typography/Typography";
import sharedStyles from "../shared.module.scss";
import styles from "./search.module.scss";
import scrollBarStyles from "../Scrollbar/scrollbar.module.scss";

function randomColor() {
  // returns a light color
  let hex1 = Math.round(145 + Math.random() * 110);
  let hex2 = Math.round(145 + Math.random() * 110);
  let hex3 = Math.round(145 + Math.random() * 110);
  return "#" + hex1.toString(16) + hex2.toString(16) + hex3.toString(16);
}

function BaseInputs({ setQuery, setKeywords, sendRequest }) {
  return (
    <Container row fullWidth justify="space-between" align="flex-end">
      <Container row width="80%">
        <Input
          title="Query"
          width="50%"
          onChange={(e) => setQuery(e.target.value)}
          keep
        />
        <Input
          title="Keywords"
          width="30%"
          onEnter={(e) => {
            let value = e.target.value;
            setKeywords((keywords) => {
              if (keywords.length > 20) {
                return keywords;
              }
              return [...keywords, { value, color: randomColor() }];
            });
          }}
        />
      </Container>
      <Button
        style={{ marginRight: "0.6125rem", marginBottom: "0.6125rem" }}
        onClick={sendRequest}
      >
        Get Started
      </Button>
    </Container>
  );
}

function Keyword({ value, color }) {
  return (
    <div className={styles.keyword} style={{ backgroundColor: color }}>
      {value}
    </div>
  );
}

function Keywords({ keywords = [{}] }, noMargin) {
  return (
    <Container
      row
      style={{
        height: "2.5rem",
        flexWrap: "wrap",
        marginLeft: noMargin ? "0" : "0.625rem",
        overflow: "hidden",
      }}
      align="center"
    >
      {keywords.map((v, i) => (
        <Keyword key={i} value={v.value} color={v.color} />
      ))}
    </Container>
  );
}

function LinkInput({ setLinks }) {
  return (
    <Container row>
      <Input
        title="Links"
        width="30%"
        onEnter={(e) => {
          let value = e.target.value;
          setLinks((links) => {
            if (links.length > 10) {
              return links;
            }
            return [...links, { value, color: randomColor() }];
          });
        }}
      />
    </Container>
  );
}

function Link({ value, color }) {
  return (
    <div className={styles.link} style={{ backgroundColor: color }}>
      {value}
    </div>
  );
}

function Links({ links = [] }, noMargin) {
  return (
    <Container
      row
      style={{
        height: "2.5rem",
        flexWrap: "wrap",
        marginLeft: noMargin ? "0" : "0.625rem",
        overflow: "hidden",
      }}
      align="center"
    >
      {links.map((v, i) => (
        <Link key={i} value={v.value} color={v.color} />
      ))}
    </Container>
  );
}

function sendRequest(query, keywords, links) {
  //
  // return data
}

function Summary({ v }) {
  console.log(v);
  let match = v.match(/^\[.+?\]/);
  return match ? (
    <P style={{ alignSelf: "flex-start" }}>
      <a href="match[0]" style={{ color: "#32A5E4" }}>
        [SOURCE]
      </a>
      {v.replace(match[0], "")}
    </P>
  ) : (
    <P style={{ alignSelf: "flex-start" }}>{v}</P>
  );
}

function Search({ information, setInformation }) {
  let [query, setQuery] = React.useState([]);
  let [links, setLinks] = React.useState([]);
  let [keywords, setKeywords] = React.useState([]);
  return (
    <Container gap="2rem" style={{ flexGrow: 1 }}>
      <Container>
        <BaseInputs
          setQuery={setQuery}
          setKeywords={setKeywords}
          sendRequest={() => sendRequest(query, keywords, links)}
        />
        <Keywords keywords={keywords} />
        <LinkInput setLinks={setLinks} />
        <Links links={links} />
      </Container>
      <ContainedCard
        style={{ flexGrow: 1 }}
        overflowY="scroll"
        gap={"2.5rem"}
        className={scrollBarStyles.scrollbar}
      >
        <Container gap="1.5rem">
          <Header style={{ alignSelf: "flex-start", fontSize: "1.875rem" }}>
            {information.query}
          </Header>
          <Container>
            <Keywords keywords={information.keywords} noMargin />
            <Links links={information.links} noMargin />
          </Container>
        </Container>
        <Container>
          {information.summaries.map((v) => (
            <Summary v={v} />
          ))}
        </Container>
      </ContainedCard>
    </Container>
  );
}

export { Search, Keywords, Links, Summary };
