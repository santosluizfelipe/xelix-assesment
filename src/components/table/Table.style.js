import styled from "styled-components";
import themes from "../../themes/themes";

const breakpoints = {
  desktop: '1025px',
  tablet: '1024px',
  smartphone: '576px',
};

export const Box = styled.div`
  display: flex;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  flex-direction: row;
  width: 100%;
  @media (max-width: 680px) {
  }
`

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${themes.whiteBackground};
  overflow: hidden;  

  @media (min-width: ${breakpoints.desktop}) {
    width: 80%;
    margin: 20px auto;
    margin-top: 9rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
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

export const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: auto;
  font-family: Arial, Helvetica, sans-serif;

`;

export const TableInvoice = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: ${themes.homeBackground};
    color: white;
    font-weight: bold;

    top: 0; 
    z-index: 1; 
  }

  tr:nth-child(even) {
    background-color: ${themes.table.background};
  }

  tr:hover {
    background-color: ${themes.table.hoverBackground};
  }
`;

export const TableHeader = styled.thead`
  font-size: 15px;

  
  tr {
    background-color: ${themes.primaryColor};
    color: white;
    text-align: center;
  }
`;

export const TableBody = styled.tbody`
  font-size: 14px;

  tr:nth-child(even) {
    background-color: ${themes.table.background};
  }

  tr:hover {
    background-color: ${themes.table.hoverBackground};
  }
`;


export const PayButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${themes.button};
  color: ${themes.buttonText};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;



 
    &:hover {
    background-color: ${themes.hoverButton};
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: ${themes.hoverButton};
  }

`;

export const CancelButton = styled(PayButton)`
  background-color: ${themes.button2};
  border: 1px solid ${themes.button};
  color: ${themes.button};
  margin-right: 0.5rem;


  @media (min-width: 680px) {
  &:hover {
    color: ${themes.buttonText};
    border-color: ${themes.buttonText};
    background-color: ${themes.button};
  }

  &:active {
    color: ${themes.buttonText};
  }
}
`;

export const IconButton = styled(CancelButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  padding: 0.5rem;

  &:active {
    color: ${themes.buttonText};
  }
`;



export const FilterWrapper = styled.div`
  display: flex;
  background-color: ${themes.cardBackground};
  padding: 2rem;
  margin-top: 1.5rem;
  border-radius: 15px;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 70%;
  height: 100%;

`;

export const InputWrappers = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
  font-weight: 600;
`

export const StyledInput = styled.input`
  height: 40px; 
  padding: 0 10px;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  border: 1px solid #ccc;
  border-radius: 4px;
`;