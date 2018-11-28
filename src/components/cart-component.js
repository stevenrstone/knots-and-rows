import React, { Component } from 'react'; // eslint-disable-line
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line
import styled, { css } from 'react-emotion';
import CartListItem from './cart-list-item';
import theme from '../theme';
import linkStyle from './link-styling';

const fixedBody = css`
  @media (max-width: 768px) {
    overflow: hidden;
    position: relative;

    &::after {
      background: rgba(0, 0, 0, 0.5);
      bottom: 0;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`;

const CartContainer = styled('div')`
  right: 2rem;
  position: absolute;
  top: 2rem;

  @media (max-width: 768px) {
    background: ${theme.colors.background};
    box-shadow: ${theme.styling.boxShadow};
    left: 0;
    padding: 1rem;
    position: fixed;
    right: 0;
    text-align: right;
    top: 0;
    z-index: 50;
  }
`;

const CartButton = styled('button')`
  background: transparent;
  border: none;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      cursor: not-allowed;
      text-decoration: none;
    }
  }

  @media (max-width: 768px) {
    display: block;
    text-align: right;
    width: 100%;
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

  @media (max-width: 768px) {
    height: auto;
    left: 0;
    max-height: 100%;
    position: fixed;
    top: 3rem;
    width: 100%;
  }
`;

const CartItemList = styled('ol')`
  display: block;
  list-style: none;
  padding: 0;
`;

const CheckoutButton = styled('a')`
  background-color: ${theme.colors.bars};
  border: none;
  color: buttontext;
  cursor: pointer;
  display: block;
  font-family: ${theme.fonts.primary};
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0;
  text-align: center;
  text-decoration: none;
  width: 100%;
`;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartId: props.store.getState().cartId || null,
      cart: props.store.getState.cart || null,
      open: false,
    };
    this.initialStoreState = this.props.store.getState();
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
    this.storeState = this.props.store.getState();
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
      if (this.state.open && lineItems.length === 0) {
        if (typeof document !== 'undefined') {
          document.body.classList.remove(fixedBody);
        }
      }
    }
  }

  handleQuantityChange = (quantity, item) => {
    const checkoutId = this.state.cartId;
    const { client } = this.props.store.getState();
    const lineItemsToUpdate = [
      {
        id: item.id,
        quantity: parseInt(quantity, 10),
      },
    ];

    client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then((newCheckout) => {
        this.props.store.dispatch({
          type: 'UPDATE_LINE_ITEMS',
          lineItems: newCheckout.lineItems,
        });
      });
  };

  handleRemoveItem = (item) => {
    const checkoutId = this.state.cartId;
    const { client } = this.props.store.getState();
    const lineItemsToRemove = [item.id];

    client.checkout
      .removeLineItems(checkoutId, lineItemsToRemove)
      .then((newCheckout) => {
        this.props.store.dispatch({
          type: 'UPDATE_LINE_ITEMS',
          lineItems: newCheckout.lineItems,
        });
      });
  };

  handleCartToggle = () => {
    this.setState(
      {
        open: !this.state.open,
      },
      () => {
        if (this.state.open && typeof document !== 'undefined') {
          /* eslint-disable */
          document.body.classList.contains(fixedBody)
            ? document.body.classList.remove(fixedBody)
            : document.body.classList.add(fixedBody);
          /* eslint-enable */
          const classThis = this;
          document.body.addEventListener('click', function outsideClick(evt) {
            const etgt = evt.target;
            if (etgt.closest('.js-cart') === null) {
              classThis.setState({
                open: false,
              });
              document.body.classList.remove(fixedBody);
              document.body.removeEventListener('click', outsideClick);
            }
          });
        } else if (typeof document !== 'undefined') {
          document.body.classList.remove(fixedBody);
        }
      },
    );
  };

  render() {
    const renderSubtotal = () => {
      const SubtotalLine = styled('li')`
        font-family: ${theme.fonts.primary};
        text-align: right;
      `;
      const subtotal = this.state.cart.reduce(
        (acc, item) => acc + item.quantity * parseFloat(item.variant.price, 10),
        0,
      );
      return <SubtotalLine>Subtotal: ${subtotal}</SubtotalLine>;
    };

    if (this.state.cart && this.state.cart.length) {
      return (
        <CartContainer className="js-cart">
          <CartButton
            className={linkStyle}
            type="button"
            onClick={this.handleCartToggle}
          >
            Cart ({this.state.cart.length} items)
          </CartButton>
          {this.state.open ? (
            <StyledCart>
              <CartItemList>
                {this.state.cart.map(item => (
                  <CartListItem
                    key={item.title}
                    item={item}
                    handleQuantityChange={this.handleQuantityChange}
                    handleRemoveItem={this.handleRemoveItem}
                  />
                ))}
                {renderSubtotal()}
              </CartItemList>
              <CheckoutButton href={this.props.store.getState().url}>
                Proceed to Checkout
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
