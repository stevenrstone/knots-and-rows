import Client from 'shopify-buy';
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line
import store from './store';

const storeCartId = (cartId, client) => {
  console.log(cartId);
  store.dispatch({
    type: 'SET_CART_ID',
    cartId,
  });
  store.dispatch({
    type: 'SET_CLIENT',
    client,
  });
};

const initCart = async (shopifyClientInfo) => {
  const client = Client.buildClient(shopifyClientInfo);
  if (typeof document !== 'undefined') {
    const allCookies = document.cookie;
    console.log(allCookies);
    if (
      allCookies.split(';').filter(item => item.indexOf('KandRCartId=') >= 0)
        .length
    ) {
      console.log('cart exists');
      const cartId = allCookies.replace(
        /(?:(?:^|.*;\s*)KandRCartId\s*\=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      storeCartId(cartId, client);
      store.dispatch({
        type: 'UPDATE_LINE_ITEMS',
        lineItems: (await client.checkout.fetch(cartId)).lineItems,
      });
    } else {
      const cart = await client.checkout.create();
      document.cookie = `KandRCartId=${
        cart.id
      };expires=2040-12-31T00:00:00.000Z;path=/`;
      // store cartid in redux store
      storeCartId(cart.id, client);
    }
  }
  return null;
};

export default initCart;
