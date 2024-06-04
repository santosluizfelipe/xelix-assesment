import styled from "styled-components";
import themes from "../../themes/themes";

const breakpoints = {
  desktop: '1025px',
  tablet: '1024px',
  smartphone: '576px',
};

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${themes.whiteBackground};
  overflow: scroll;


  @media (min-width: ${breakpoints.desktop}) {
}

@media (max-width: ${breakpoints.tablet}) {
  width: 95%;
  height: 70%;
  border-radius: 20px;
}

@media (max-width: 680px) {
  width: 95%;
  height: 70%;
  border-radius: 20px;

}
`;

export const TableInvoice = styled.table`
  
`