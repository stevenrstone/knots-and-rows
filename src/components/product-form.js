import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import theme from '../theme';
import store from '../util/store';

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
    };
  }

  componentDidMount() {
    // this.props.cart.then(() => this.setState({ cartReady: true }));
    const { cartId } = store.getState();
    const storeState = store.getState();
    if (storeState === {}) return;
    store
      .getState()
      .client.checkout.fetch(cartId)
      .then(() => this.setState({ cartId }));
  }

  handleWeightChange(e) {
    this.setState({ weight: e.target.value });
  }

  handleQuantityChange(e) {
    if (e.target.value < 1) e.target.value = 1;
    this.setState({ quantity: parseInt(e.target.value, 10) });
  }

  handleAddToCart = () => {
    console.log('adding to cart');
    if (!this.state.cartId) return;

    const lineItemsToAdd = {
      variantId: this.state.weight,
      quantity: this.state.quantity,
    };

    store
      .getState()
      .client.checkout.addLineItems(this.state.cartId, lineItemsToAdd)
      .then((newCheckout) => {
        newCheckout.lineItems.forEach(item => console.log(item.quantity, item.title));
        store.dispatch({
          type: 'UPDATE_LINE_ITEMS',
          lineItems: newCheckout.lineItems,
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
          Add to Cart
        </AddToCart>
      </React.Fragment>
    );
  }
}
