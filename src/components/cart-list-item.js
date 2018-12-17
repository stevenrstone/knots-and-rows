import React from 'react'; // eslint-disable-line
import { Link } from 'react-static';
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
    display: inline-block;
    height: 95%;
    max-width: 100%;
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

const RemoveSymbol = styled('span')`
  align-items: center;
  background: ${theme.colors.link};
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  height: 1rem;
  justify-content: center;
  width: 1rem;
`;

const generateProductLink = (allProducts, item) => {
  const thisProduct = allProducts.products.filter(
    product => product.title === item.title,
  );
  const url = `/shop/${thisProduct[0].collection}/${thisProduct[0].handle}`;
  return url;
};

const CartListItem = ({
  item,
  handleQuantityChange,
  handleRemoveItem,
  allProducts,
}) => (
  <StyledCartListItem>
    <Link to={generateProductLink(allProducts, item)} className="image">
      <img className="image" src={item.variant.image.src} alt={item.title} />
    </Link>
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
