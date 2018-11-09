import React from 'react';
import styled from 'react-emotion';
import theme from '../theme';

const Dropdown = ({ title, container, children }) => {
  const Title = styled('div')`
    color: ${theme.colors.link};
    cursor: pointer;
    font-family: ${theme.fonts.primary};
    margin: 0 1rem;
    position: relative;
    text-decoration: none;

    &.jsa-${title}-dropdown-open ol {
      display: block;
    }

    @media (max-width: 768px) {
      padding: 1rem 0;
    }
  `;

  const List = styled('ol')`
    background: ${theme.colors.background};
    border: 1px solid ${theme.colors.bars};
    cursor: default;
    display: none;
    list-style: none;
    margin: 1rem 0;
    padding: 1rem 0.5rem;
    position: absolute;
    text-align: left;
    top: 0;
    z-index: 10;

    @media (max-width: 768px) {
      border: none;
      margin: 0;
      padding: 0.5rem 0;
      position: static;
    }
  `;

  const ListItem = styled('li')`
    margin: 0.5rem 0;
    white-space: nowrap;

    @media (max-width: 768px) {
      margin: 1rem 0;
    }

    a {
      padding: 0.5rem 0;
    }
  `;

  const handleTouch = (e) => {
    const clickTarget = e.target;
    if (clickTarget.classList.contains(`jsa-${title}-dropdown-open`)) {
      clickTarget.classList.remove(`jsa-${title}-dropdown-open`);
    } else {
      clickTarget.classList.add(`jsa-${title}-dropdown-open`);
      container.addEventListener('click', function outsideClick(ebody) {
        if (
          ebody.target.contains(clickTarget)
          && ebody.target !== clickTarget
        ) {
          clickTarget.classList.remove(`jsa-${title}-dropdown-open`);
          container.removeEventListener('click', outsideClick);
        }
      });
    }
  };

  const handleMouseEnter = (e) => {
    e.target.classList.add(`jsa-${title}-dropdown-open`);
  };

  const handleMouseLeave = (e) => {
    if (document.querySelector(`.jsa-${title}-dropdown-open`) !== null) {
      document
        .querySelector(`.jsa-${title}-dropdown-open`)
        .classList.remove(`jsa-${title}-dropdown-open`);
    }
    e.target.classList.remove(`jsa-${title}-dropdown-open`);
  };

  const renderChildren = () => children.map((child, index) => <ListItem key={index}>{child}</ListItem>);

  return (
    <React.Fragment>
      <Title
        onTouchEnd={handleTouch}
        onMouseEnter={e => handleMouseEnter(e)}
        onMouseLeave={e => handleMouseLeave(e)}
      >
        {title}
        <List>{renderChildren()}</List>
      </Title>
    </React.Fragment>
  );
};

export default Dropdown;
