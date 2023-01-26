import React from "react";
import styled from "styled-components";

import mountain from "../assets/mountain.svg";


const Background = () => {
  return (
    <Wrapper>
    </Wrapper>

  )
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 1300px;
  background: linear-gradient(135deg, #edf2f4 5.33%, #2b2d42 40.13%);

  text-align: center;
  z-index: -1;
`;

export default Background;