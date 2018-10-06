import React from 'react';
import styled from 'react-emotion';
import theme from '../theme';

const Dropdown = ({ title, container, children }) => {
  const List = styled('ol')`
    background: ${theme.colors.background};
    border: 1px solid ${theme.colors.bars};
    cursor: default;
    display: none;
    list-style: none;
    padding: 1rem 0.5rem;
    position: absolute;
    text-align: left;
    z-index: 10;
  `;

  const Title = styled('span')`
    color: ${theme.colors.link};
    cursor: pointer;
    font-family: ${theme.fonts.primary};
    margin: 0 1rem;
    position: relative;
    text-decoration: none;

    &.jsa-open ol {
      display: block;
    }
  `;

  const ListItem = styled('li')`
    margin: 0.5rem 0;
    white-space: nowrap;

    a {
      padding: 0.5rem 0;
    }
  `;

  const handleClick = (e) => {
    const clickTarget = e.target;
    if (clickTarget.classList.contains('jsa-open')) {
      clickTarget.classList.remove('jsa-open');
    } else {
      clickTarget.classList.add('jsa-open');
      container.addEventListener('click', function outsideClick(ebody) {
        if (
          ebody.target.contains(clickTarget)
          && ebody.target !== clickTarget
        ) {
          clickTarget.classList.remove('jsa-open');
          container.removeEventListener('click', outsideClick);
        }
      });
    }
  };

  const renderChildren = () => children.map((child, index) => <ListItem key={index}>{child}</ListItem>);

  return (
    <React.Fragment>
      <Title onClick={handleClick}>
        {title}
        <List>{renderChildren()}</List>
      </Title>
    </React.Fragment>
  );
};

export default Dropdown;
