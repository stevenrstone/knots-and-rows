import React from 'react';
import styled from 'react-emotion';
import theme from '../theme';

const StyledCartListItem = styled('li')`
  align-items: center;
  border-bottom: 1px solid ${theme.colors.bars};
  display: flex;
  font-family: ${theme.fonts.primary};
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

  input {
    font-family: ${theme.fonts.primary};
  }
`;

const CartListItem = ({ item, handleQuantityChange, handleRemoveItem }) => (
  <StyledCartListItem>
    <img className="image" src={item.variant.image.src} alt={item.title} />
    <span className="title">
      {item.title}
      <br />({item.variant.title})
    </span>
    x
    <input
      type="number"
      min="1"
      max="10"
      step="1"
      defaultValue={item.quantity}
      onBlur={(e) => {
        if (e.target.value !== item.quantity) {
          if (!e.target.value) e.target.value = 0;
          if (e.target.value > 10) e.target.value = 10;
          if (e.target.value < 0) e.target.value = 0;
          handleQuantityChange(e.target.value, item);
        }
      }}
    />
    <span className="price">
      ${(parseFloat(item.variant.price) * item.quantity).toString()}
    </span>
    <span onClick={() => handleRemoveItem(item)}>Remove</span>
  </StyledCartListItem>
);

export default CartListItem;
