import React from 'react';
import { withRouteData } from 'react-static';
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

const NavLink = styled(StyledLink)`
  display: block;
  white-space: ;
`;

export default withRouteData(props => (
  <Nav>
    <StyledLink to="/">Home</StyledLink>
    <Dropdown
      title="Shop"
      container={typeof document !== 'undefined' ? document.body : null}
    >
      {props.types.map(type => (
        <StyledLink to={`/shop/${type}`} key={type}>
          {type.trim()}
        </StyledLink>
      ))}
    </Dropdown>
    {/* <StyledLink to="/faq">FAQ</StyledLink>
    <StyledLink to="/about">About</StyledLink>
    <StyledLink to="/patterns">Patterns</StyledLink>
    <StyledLink to="/blog">Blog</StyledLink>
    <StyledLink to="/contact">Contact</StyledLink> */}
  </Nav>
));

// export default RenderedNav;
