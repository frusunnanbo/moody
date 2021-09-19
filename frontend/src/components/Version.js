import styled from "styled-components";

const VersionDiv = styled.div`
  margin: 0.5em;
  position: absolute;
  bottom: 0;
  right: 0;
`;

function Version() {
  const version = (process.env.REACT_APP_GIT_SHA || "unknown").slice(0, 7);
  return <VersionDiv>v{version}</VersionDiv>;
}

export default Version;
