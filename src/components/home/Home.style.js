import styled from "styled-components";
import themes from "../../themes/themes";



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

  @media (max-width: 680px) {
    width: 100%;
  }
`;
