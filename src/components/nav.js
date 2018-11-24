import React from 'react';
import { withRouteData } from 'react-static';
import styled from 'react-emotion';
import Dropdown from './dropdown';
import NavLink from './nav-link';
import theme from '../theme';

const Nav = styled('nav')`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding-bottom: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    height: 0;
    flex-direction: column;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const MobileMenuButton = styled('button')`
  background: transparent;
  border: none;
  // border-bottom: 2px solid ${theme.colors.bars};
  color: ${theme.colors.link};
  cursor: pointer;
  display: none;
  font-family: ${theme.fonts.primary};
  font-size: 1.3rem;
  margin-top: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    display: block;
  }

  &.jsa-mobile-nav-open + nav {
    height: auto;
  }
`;

export default withRouteData((props) => {
  const handleMobileMenuClick = (e) => {
    e.target.classList.toggle('jsa-mobile-nav-open');
  };

  return (
    <React.Fragment>
      <MobileMenuButton onClick={handleMobileMenuClick}>Menu</MobileMenuButton>
      <Nav>
        {/* <NavLink to="/">Home</NavLink> */}
        <Dropdown
          title="Shop"
          container={typeof document !== 'undefined' ? document.body : null}
        >
          {props.collections
            && props.collections.map(type => (
              <NavLink to={`/shop/${type.handle}`} key={type.handle}>
                {type.title}
              </NavLink>
            ))}
        </Dropdown>
        <NavLink to="/frequently-asked-questions">FAQ</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/patterns">Patterns</NavLink>
        {/* <StyledLink to="/blog">Blog</StyledLink> */}
        <NavLink to="/contact">Contact</NavLink>
      </Nav>
    </React.Fragment>
  );
});

// export default RenderedNav;
