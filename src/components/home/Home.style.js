import styled from "styled-components";
import themes from "../../themes/themes";

const breakpoints = {
  desktop: "1025px",
  tablet: "1024px",
  smartphone: "576px",
};

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0rem;
  left: 0;
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    140deg,
    ${themes.homeBackground} 35%,
    ${themes.transitionBackground} 75%
  );
  position: relative;
  z-index: 1;

  @media (min-width: ${breakpoints.desktop}) {
  }

  @media (max-width: ${breakpoints.tablet}) {
  }

  @media (max-width: 680px) {
    width: 100%;
  }
`;
