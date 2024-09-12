import React from "react";
import "./DashboardStyle.css";
import "./DashboardModule.css";
import card from "../component/card";

import styled from "styled-components";

const HeadingMan = styled.h1`
  color: red;
  display: inline;
`;

export default function Dashborad() {
  return (
    <>
      <HeadingMan>tets</HeadingMan>
      <h1 style={{ color: "" }}>This Is Dashboard Page</h1>
      <p className="try-class"> tryyy</p>
      {/* <h3 className={style.try-class} ></h3> */}
    </>
  );
}
