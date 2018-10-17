import Client from 'shopify-buy';
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line

const Cart = {
  initCart: async (shopifyClientInfo) => {
    const client = Client.buildClient(shopifyClientInfo);
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
        // return cartId;
        const cart = await client.checkout.fetch(cartId);
        return cart;
      }
      const cart = await client.checkout.create();
      document.cookie = `KandRCartId=${cart.id};max-age=60*60*24*365`;
      return cart;
    }
    return null;
  },
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
};

export default Cart;
