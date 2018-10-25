import React from 'react';
import styled from 'react-emotion';
import theme from '../theme';

const StyledCartListItem = styled('li')`
  align-items: center;
  border-bottom: 1px solid ${theme.colors.bars};
  display: flex;
  height: 100px;
  justify-content: space-between;
  width: 100%;

  .image {
    max-height: 100%;
    max-width: 20%;
  }

  .title {
    align-items: center;
    display: inline-flex;
    flex-grow: 3;
    font-family: ${theme.fonts.primary};
    height: 100%;
    padding: 0 0.5rem;
    text-align: left;
  }

  .price {
    align-items: center;
    display: inline-flex;
    font-family: ${theme.fonts.primary};
    height: 100%;
    padding: 0 0.5rem;
    text-align: left;
  }
`;

const CartListItem = ({ item }) => (
  <StyledCartListItem>
    <img className="image" src={item.variant.image.src} alt={item.title} />
    <span className="title">
      {item.title}
      <br />({item.variant.title}) ({item.quantity})
    </span>
    <span className="price">
      ${(parseFloat(item.variant.price) * item.quantity).toString()}
    </span>
  </StyledCartListItem>
);

export default CartListItem;
