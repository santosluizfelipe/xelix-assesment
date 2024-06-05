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
  overflow: hidden;  // Remove scroll from here

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
  width: 100%;
  overflow: auto;
`;

export const TableInvoice = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: ${themes.homeBackground};
    color: white;
    font-weight: bold;
    position: sticky;
    top: 0; 
    z-index: 1; 
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export const TableHeader = styled.thead`
  tr {
    background-color: ${themes.primaryColor};
    color: white;
    text-align: left;
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;
