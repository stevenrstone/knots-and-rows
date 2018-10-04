import React from 'react';
import styled from 'react-emotion';
import theme from '../theme';
import Afterbar from './after-bar';
import Nav from './nav';

const Header = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  width: 100%;
`;

const Title = styled('h1')`
  color: ${theme.colors.copy};
  font-family: ${theme.fonts.title};
  margin: 0;
`;

export default ({ title }) => (
  <React.Fragment>
    <Header>
      <a href="/">
        <img src="/gary.jpg" alt="Knots and Rows Logo" />
      </a>
      <Title>{title}</Title>
      <Nav />
    </Header>
    <Afterbar />
  </React.Fragment>
);
