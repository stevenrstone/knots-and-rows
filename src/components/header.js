import React from 'react';
import styled from 'astroturf';
import Afterbar from './after-bar';
import Nav from './nav';
import Cart from '../containers/cart-container';
import store from '../util/store';

const Header = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    padding-top: 3rem;
  }
`;

const Title = styled('h1')`
  @import '../theme.scss';
  color: $colorCopy;
  font-family: $fontTitle;
  margin: 0;
`;

export default ({ title }) => (
  <React.Fragment>
    <Header>
      <a href="/">
        <img src="/gary.svg" alt="Knots and Rows Logo" />
      </a>
      <Title>{title}</Title>
      <Nav />
      {/* {console.log(cart.then(data => console.log(data)))} */}
      <Cart store={store} />
    </Header>
    <Afterbar />
  </React.Fragment>
);
