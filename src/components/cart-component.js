import React, { Component } from 'react';
// import Client from 'shopify-buy';
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line
import styled from 'react-emotion';
import CartListItem from './cart-list-item';
import theme from '../theme';
import linkStyle from './link-styling';

const CartContainer = styled('div')`
  right: 2rem;
  position: absolute;
  top: 2rem;
`;

const CartButton = styled('button')`
  background: transparent;
  border: none;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const StyledCart = styled('div')`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.bars};
  box-shadow: ${theme.styling.boxShadow};
  box-sizing: border-box;
  min-height: 200px;
  max-height: 400px;
  padding: 0 1rem 2rem;
  right: 0;
  overflow-y: scroll;
  position: absolute;
  top: calc(100% + 0.5rem);
  width: 500px;
  z-index: 20;
`;

const CartItemList = styled('ol')`
  display: block;
  list-style: none;
  padding: 0;
`;

const CheckoutButton = styled('a')`
  background-color: ${theme.colors.bars};
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  display: block;
  font-family: ${theme.fonts.primary};
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0;
  text-align: center;
  width: 100%;
`;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartId: null,
      cart: null,
      open: false,
    };
    this.initialStoreState = this.props.store.getState();
  }

  setCart() {
    if (this.props.store) {
      const storeState = this.props.store.getState();
      // console.log(storeState, this.state);
      this.setState({
        cartId: storeState.cartId,
        cart: storeState.lineItems,
      });
    }
  }

  componentDidMount() {
    this.setCart();
    this.storeState = this.props.store.getState();
    // console.log('cart mounting');
  }

  componentDidUpdate() {
    const { cartId } = this.props.store.getState();
    if (
      this.state.cartId !== cartId
      && cartId !== undefined
      && this.initialStoreState.cartId !== cartId
    ) {
      this.setCart();
    }
    const { lineItems } = this.props.store.getState();
    if (this.state.cart !== lineItems) {
      this.setState({
        cart: lineItems,
      });
    }
  }

  render() {
    const handleCartToggle = (e) => {
      this.setState(
        {
          open: !this.state.open,
        },
        () => {
          if (this.state.open && typeof document !== 'undefined') {
            const classThis = this;
            document.body.addEventListener('click', function outsideClick(evt) {
              const etgt = evt.target;
              if (etgt.closest('.js-cart') === null) {
                classThis.setState({
                  open: false,
                });
                document.body.removeEventListener('click', outsideClick);
              }
            });
          }
        },
      );
    };

    if (this.state.cart && this.state.cart.length) {
      // console.log(this.state.cart);
      return (
        <CartContainer className="js-cart">
          <CartButton
            className={linkStyle}
            type="button"
            onClick={e => handleCartToggle(e)}
          >
            Cart ({this.state.cart.length} items)
          </CartButton>
          {this.state.open ? (
            <StyledCart>
              <CartItemList>
                {this.state.cart.map(
                  // item => console.log(item.variant),
                  item => (
                    <CartListItem key={item.title} item={item} />
                  ),
                )}
              </CartItemList>
              {/* {console.log(this.props.store.getState().client)} */}
              <CheckoutButton href={this.props.store.getState().url}>
                Checkout
              </CheckoutButton>
            </StyledCart>
          ) : null}
        </CartContainer>
      );
    }
    if (this.state.cart && !this.state.cart.length) {
      return (
        <CartContainer>
          <CartButton className={linkStyle} type="button" disabled>
            Cart (0 items)
          </CartButton>
        </CartContainer>
      );
    }
    // console.log(this.state.cart);
    return (
      <CartContainer>
        <CartButton className={linkStyle} type="button" disabled>
          Fetching cart...
        </CartButton>
      </CartContainer>
    );
  }
}

export default Cart;