import React from 'react';
import styled, { css } from 'react-emotion';
import theme from '../theme';

const LoadingBar = styled('div')`
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyledSheep = styled('div')`
  animation: spin 1.3s infinite linear;
  // border: 1px solid black;
  // flex-grow: 2;
  height: 75px;
  min-height: 75px;
  min-width: 50px;
  overflow: visible;
  position: relative;
  width: 50px;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SheepBody = styled('div')`
  background: white;
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
  background: lightgray;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  height: 70%;
  position: absolute;
  width: 70%;
`;

const Face = styled('div')`
  background: black;
  border-radius: 50%;
  height: 45%;
  left: 25%;
  position: absolute;
  top: 30%;
  width: 50%;
  z-index: 10;
`;

const Eye = styled('div')`
  background: white;
  border-radius: 50%;
  height: 20%;
  position: absolute;
  top: 20%;
  width: 10%;
  z-index: 10;
`;

const Ear = styled('div')`
  background: black;
  border-radius: 50%/70% 70% 30% 30%;
  height: 60%;
  left: -10%;
  position: absolute;
  top: -15%;
  transform: rotate(-80deg);
  width: 30%;
  z-index: 5;
`;

const LoadingText = styled('h3')`
  box-sizing: border-box;
  font-family: ${theme.fonts.primary};
  font-size: 1rem;
  padding-left: 1rem;
`;

const renderWool = () => {
  const wools = [];
  wools.push(<Wool style={{ top: '-10%', left: '-10%' }} />);
  wools.push(<Wool style={{ top: '-10%', left: '40%' }} />);
  wools.push(<Wool style={{ top: '40%', left: '-10%' }} />);
  wools.push(<Wool style={{ top: '40%', left: '40%' }} />);
  wools.push(<Wool style={{ top: '-15%', left: '20%' }} />);
  wools.push(<Wool style={{ top: '20%', left: '-15%' }} />);
  wools.push(<Wool style={{ top: '20%', left: '40%' }} />);

  return wools;
};

const renderFace = () => (
  <Face>
    <Ear />
    <Eye style={{ left: '30%' }} />
    <Eye style={{ left: '60%' }} />
    <Ear style={{ left: '80%', transform: 'rotate(80deg)' }} />
  </Face>
);

const Sheep = () => (
  <LoadingBar>
    <StyledSheep>
      <SheepBody>
        {renderWool()}
        {renderFace()}
      </SheepBody>
      <Leg style={{ left: '30%' }} />
      <Leg style={{ left: '60%' }} />
    </StyledSheep>
    <LoadingText>Just a moment - spinning your wool...</LoadingText>
  </LoadingBar>
);

export default Sheep;
