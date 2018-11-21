import React from 'react';
import styled from 'astroturf';

const StyledCartListItem = styled('li')`
  @import '../theme.scss';
  align-items: center;
  border-bottom: 1px solid $colorBars;
  display: flex;
  font-family: $fontPrimary;
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
    font-family: $fontPrimary;
    height: 100%;
    padding: 0 0.5rem;
    text-align: left;
  }

  .price {
    align-items: center;
    display: inline-flex;
    font-family: $fontPrimary;
    height: 100%;
    padding: 0 0.5rem;
    text-align: left;
  }

  input {
    font-family: $fontPrimary;
  }
`;

const RemoveSymbol = styled('span')`
  @import '../theme.scss';
  align-items: center;
  background: $colorLink;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  height: 1rem;
  justify-content: center;
  width: 1rem;
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
    <RemoveSymbol onClick={() => handleRemoveItem(item)}>&times;</RemoveSymbol>
  </StyledCartListItem>
);

export default CartListItem;
