import React from "react";
import data from "../../mockData/pay-run";
import Table from "../table/Table";

import { HomeWrapper } from "./Home.style";

console.log(data)

const Home = () => {
  return (
    <HomeWrapper>
      <Table />
    </HomeWrapper>
    
  );
};

export default Home;
