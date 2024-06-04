import styled from 'styled-components';
import themes from '../../../themes/themes';

const breakpoints = {
  desktop: '1025px',
  tablet: '1024px',
  smartphone: '576px',
};


export const NavbarWrapper = styled.div`
    position: fixed;
    background-color: ${themes.navBackground};
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 0.8;
    z-index: 2;
    box-shadow: 0 4px 8px rgba(0, 0, 0, .8);


    @media (min-width: ${breakpoints.desktop}) {
      height: 5rem;
      border-radius: 5px;
      width: 95%;
      
      margin-top: 1rem;
      border-radius: 12px;

  }

  @media (min-width: 861px) {
    height: 6rem;
    width: 94%;
    border-radius: 10px;
    
    margin-top: 1.5rem;
   

  }

  @media (max-width: 860px) {
    width: 100%;
    height: 4rem;
  }

`;

export const Logo = styled.div`
    img {
        height: 2rem;
        width: auto;
        margin-left: 1.5rem;
    }
`;