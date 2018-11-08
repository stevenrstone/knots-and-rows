import React from 'react';
import styled, { css } from 'react-emotion';

const StyledSheep = styled('div')`
  border: 1px solid black;
  height: 300px;
  overflow: visible;
  position: relative;
  width: 200px;
`;

const SheepBody = styled('div')`
  background: gray;
  border-radius: 50%;
  height: 60%;
  left: 5%;
  position: absolute;
  top: 10%;
  width: 90%;
  z-index: 10;
`;

const Leg = styled('div')`
  background: black;
  bottom: 10%;
  height: 40%;
  position: absolute;
  width: 10%;
  z-index: 1;
`;

const Wool = styled('div')`
  background: gray;
  border-radius: 50%;
  height: 10%;
  width: 10%;
`;

const renderWool = () => {};

const Sheep = () => (
  <StyledSheep>
    <SheepBody>{renderWool()}</SheepBody>
    <Leg style={{ left: '30%' }} />
    <Leg style={{ left: '60%' }} />
  </StyledSheep>
);

export default Sheep;
