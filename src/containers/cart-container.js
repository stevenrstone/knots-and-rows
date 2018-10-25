import React from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import CartComponent from '../components/cart-component';

const mapStateToProps = store => ({
  users: store.lineItems,
});

export default connect(mapStateToProps)(CartComponent);
