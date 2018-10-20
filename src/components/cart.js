import React, { Component } from 'react';
import Client from 'shopify-buy';
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartId: null,
      cart: null,
    };
  }

  componentDidMount() {
    if (this.props.store) {
      const storeState = this.props.store.getState();
      this.setState({
        cartId: storeState.cartId,
        cart: storeState.lineItems,
      });
    }
  }

  componentDidUpdate() {
    console.log(this.props.store.getState());
    const { lineItems } = this.props.store.getState();
    if (this.state.cart !== lineItems) {
      this.setState({
        cart: lineItems,
      });
    }
  }

  render() {
    console.log(this.state.cart);
    if (this.state.cart) {
      return JSON.stringify(this.state.cart);
    }
    return 'no cart';
  }
}

export default Cart;
