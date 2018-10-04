import React from 'react';
import styled from 'react-emotion';
import Dropdown from './dropdown';
import StyledLink from './styled-link';

const Nav = styled('nav')`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding-bottom: 1.5rem;
  width: 100%;
`;

const RenderedNav = () => (
  <Nav>
    <StyledLink to="/">Home</StyledLink>
    <Dropdown
      title="Shop"
      container={typeof document !== 'undefined' ? document.body : null}
    >
      <StyledLink to="/shop/tonals">Tonals</StyledLink>
      <StyledLink to="/shop/speckles">Speckles</StyledLink>
      <StyledLink to="/shop/kits">Kits</StyledLink>
      <StyledLink to="/shop/lumos">Lumos</StyledLink>
      <StyledLink to="/shop/specials">Specials</StyledLink>
      <StyledLink to="/shop/sale">Sale</StyledLink>
    </Dropdown>
    {/* <StyledLink to="/faq">FAQ</StyledLink>
    <StyledLink to="/about">About</StyledLink>
    <StyledLink to="/patterns">Patterns</StyledLink>
    <StyledLink to="/blog">Blog</StyledLink>
    <StyledLink to="/contact">Contact</StyledLink> */}
  </Nav>
);

export default RenderedNav;
