import React from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import CartComponent from '../components/cart-component';

const mapStateToProps = store => ({
  lineItems: store.lineItems,
  cartId: store.cartId,
  cart: store.cart,
  url: store.url,
  client: store.client,
});

export default connect(mapStateToProps)(CartComponent);
