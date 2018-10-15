import React from 'react';
import styled, { css } from 'react-emotion';
import theme from '../theme';

const Form = styled('form')`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const InputField = styled('div')`
  box-sizing: border-box;
  padding-top: 1.5rem;
  position: relative;

  &:first-child {
    flex-grow: 3;
    margin-right: 0.5rem;
  }
`;

const InputLabel = styled('label')`
  color: ${theme.colors.copy};
  font-family: ${theme.fonts.primary};
  font-size: 1rem;
  left: 0;
  position: absolute;
  top: 0;
`;

const inputClass = css`
  box-sizing: border-box;
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.primary};
  height: 3.5rem;
  padding: 1rem;
  width: 100%;
`;

const AddToCart = styled('button')`
  background-color: ${theme.colors.bars};
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0;
  width: 100%;
`;

const renderOptions = variants => variants.map(
  v => (v.available ? (
        <option value={v.id} key={v.id}>{`${v.title} (${v.price})`}</option>
  ) : null),
);

const handleQuantityChange = (e) => {
  if (e.target.value < 1) e.target.value = 1;
};

export default ({ product }) => (
  <React.Fragment>
    <Form>
      <InputField>
        <InputLabel htmlFor="weight">Weight</InputLabel>
        <select className={inputClass} name="weight">
          {renderOptions(product.variants)}
        </select>
      </InputField>

      <InputField>
        <InputLabel htmlFor="quantity">Quantity</InputLabel>
        <input
          className={inputClass}
          type="number"
          minimum="1"
          step="1"
          name="quantity"
          defaultValue="1"
          onChange={e => handleQuantityChange(e)}
        />
      </InputField>
    </Form>

    <AddToCart type="button">Add to Cart</AddToCart>
  </React.Fragment>
);
