import React from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import ProductFormComponent from '../components/product-form-component';

const mapStateToProps = store => ({
  users: store.lineItems,
});

export default connect(mapStateToProps)(ProductFormComponent);
