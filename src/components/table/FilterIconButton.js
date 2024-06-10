import React from "react";
import { IconButton } from "./Table.style";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";

const FilterIconButton = ({ showFilter, handleFilterShow }) => {
  return (
    <IconButton onClick={handleFilterShow}>
      {showFilter ? <FilterAltOffOutlinedIcon /> : <FilterAltOutlinedIcon />}
    </IconButton>
  );
};

export default FilterIconButton;
