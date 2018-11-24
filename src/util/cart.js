import Client from 'shopify-buy';
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line
import store from './store';

const storeCartId = (cartId, client, url) => {
  store.dispatch({
    type: 'SET_CART_ID',
    cartId,
  });
  store.dispatch({
    type: 'SET_CLIENT',
    client,
  });
  store.dispatch({
    type: 'SET_CHECKOUT_URL',
    url,
  });
};

const initCart = async (shopifyClientInfo) => {
  const client = Client.buildClient(shopifyClientInfo);
  if (typeof document !== 'undefined') {
    const allCookies = document.cookie;
    if (
      allCookies.split(';').filter(item => item.indexOf('KandRCartId=') >= 0)
        .length
    ) {
      const cartId = allCookies.replace(
        /(?:(?:^|.*;\s*)KandRCartId\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      const cart = await client.checkout.fetch(cartId);
      storeCartId(cartId, client, cart.webUrl);
      store.dispatch({
        type: 'UPDATE_LINE_ITEMS',
        lineItems: cart.lineItems,
      });
    } else {
      const cart = await client.checkout.create();
      document.cookie = `KandRCartId=${
        cart.id
      };expires=2040-12-31T00:00:00.000Z;path=/`;
      storeCartId(cart.id, client, cart.webUrl);
    }
  }
  return null;
};

export default initCart;
