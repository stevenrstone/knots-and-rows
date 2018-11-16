import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import LoadingSheep from './loading-sheep';
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
  height: 4rem;
  overflow: visible;
  padding: 1rem 0;
  width: 100%;

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const renderOptions = variants => variants.map(
  v => (v.available ? (
        <option value={v.id} key={v.id}>{`${v.title} (${v.price})`}</option>
  ) : null),
);

export default class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartId: null,
      weight: this.props.product.variants[0].id,
      quantity: 1,
      pending: true,
    };
  }

  componentDidUpdate() {
    if (!this.state.cartId && this.props.store.getState().cartId) {
      this.setState({
        cartId: this.props.store.getState().cartId,
        pending: false,
      });
    }
  }

  handleWeightChange(e) {
    this.setState({ weight: e.target.value });
  }

  handleQuantityChange(e) {
    if (e.target.value < 1) e.target.value = 1;
    this.setState({ quantity: parseInt(e.target.value, 10) });
  }

  handleAddToCart = () => {
    if (!this.state.cartId) return;
    this.setState({
      pending: true,
    });

    const lineItemsToAdd = {
      variantId: this.state.weight,
      quantity: this.state.quantity,
    };

    this.props.store
      .getState()
      .client.checkout.addLineItems(this.state.cartId, lineItemsToAdd)
      .then((newCheckout) => {
        this.props.store.dispatch({
          type: 'UPDATE_LINE_ITEMS',
          lineItems: newCheckout.lineItems,
        });

        this.setState({
          pending: false,
        });
      });
  };

  render() {
    const { product } = this.props;
    return (
      <React.Fragment>
        <Form>
          <InputField>
            <InputLabel htmlFor="weight">Weight</InputLabel>
            <select
              className={inputClass}
              name="weight"
              onChange={e => this.handleWeightChange(e)}
              disabled={product.variants.length === 1}
            >
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
              value={this.state.quantity}
              onChange={e => this.handleQuantityChange(e)}
            />
          </InputField>
        </Form>
        <AddToCart
          type="button"
          disabled={!this.state.cartId}
          onClick={this.handleAddToCart}
        >
          {this.state.pending ? <LoadingSheep /> : 'Add to Cart'}
        </AddToCart>
      </React.Fragment>
    );
  }
}
