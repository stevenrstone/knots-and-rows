import React, { Component } from 'react';
import Client from 'shopify-buy';
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartId: null,
      cart: null,
    };
  }

  componentDidMount() {
    const client = Client.buildClient(this.props.shopifyClientInfo);
    if (typeof document !== 'undefined') {
      const allCookies = document.cookie;
      if (
        allCookies.split(';').filter(item => item.indexOf('KandRCartId=') >= 0)
          .length
      ) {
        const cartId = allCookies.replace(
          /(?:(?:^|.*;\s*)KandRCartId\s*\=\s*([^;]*).*$)|^.*$/,
          '$1',
        );
        this.setState({
          cartId,
        });
        client.checkout.fetch(cartId).then((checkout) => {
          console.log('old checkout');
          this.setState({
            cart: checkout,
          });
        });
      } else {
        client.checkout.create().then((checkout) => {
          console.log('new checkout');
          document.cookie = `KandRCartId=${checkout.id};max-age=60*60*24*365`;
          this.setState({
            cart: checkout,
          });
        });
      }
    }
  }

  render() {
    if (this.state.cart) {
      console.log(this.state.cart, this.state.cart.lineItems());
      return 'we have a cart';
    }
    return 'no cart';
  }
}

export default Cart;
