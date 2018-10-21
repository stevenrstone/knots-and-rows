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

  setCart() {
    if (this.props.store) {
      const storeState = this.props.store.getState();
      this.setState({
        cartId: storeState.cartId,
        cart: storeState.lineItems,
      });
    }
  }

  componentDidMount() {
    this.setCart();
  }

  componentDidUpdate() {
    // if (!this.state.cart && this.props.store.getState().cartId) {
    //   console.log(this.props.store.getState());
    //   this.setCart();
    // }
    const { lineItems } = this.props.store.getState();
    if (this.state.cart !== lineItems) {
      this.setState({
        cart: lineItems,
      });
    }
  }

  render() {
    if (this.state.cart && this.state.cart.length) {
      return (
        <ol>
          {this.state.cart.map(
            // item => console.log(item.variant),
            item => `${item.title}, ${item.variant.title}, ${item.quantity}`,
          )}
        </ol>
      );
    }
    if (this.state.cart && !this.state.cart.length) {
      return 'no items';
    }
    console.log(this.state.cart);
    return 'no cart';
  }
}

export default Cart;
