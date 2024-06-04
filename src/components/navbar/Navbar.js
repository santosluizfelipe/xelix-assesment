import React from "react";
import { NavbarWrapper, Logo } from "./Navbar.style";
import xelixLogo from "../../images/xelix-logo.png";

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Logo>
        <img src={xelixLogo} alt="Logo" />
      </Logo>
    </NavbarWrapper>
  );
};

export default Navbar;
