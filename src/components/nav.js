import React from 'react';
import { withRouteData } from 'react-static';
import styled from 'react-emotion';
import Dropdown from './dropdown';
import NavLink from './nav-link';

const Nav = styled('nav')`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding-bottom: 1.5rem;
  width: 100%;
`;

const NavLink = styled(NavLink)`
  display: block;
  white-space: ;
`;

export default withRouteData(props => (
  <Nav>
    <NavLink to="/">Home</NavLink>
    <Dropdown
      title="Shop"
      container={typeof document !== 'undefined' ? document.body : null}
    >
      {props.collections.map(type => (
        <NavLink to={`/shop/${type.handle}`} key={type.handle}>
          {type.title}
        </NavLink>
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
