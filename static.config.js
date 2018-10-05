import Client from 'shopify-buy';
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line

const client = Client.buildClient({
  domain: 'knots-and-rows.myshopify.com',
  storefrontAccessToken: 'c5e395cbd4faee4e096030b725ebd1ef',
});

export default {
  getSiteData: () => ({
    title: 'Knots and Rows',
  }),
  getRoutes: async () => {
    const allProducts = await client.product.fetchAll();
    const types = new Set();
    allProducts.forEach((product) => {
      types.add(product.handle);
    });
    const productPaths = [];
    types.forEach((handle) => {
      productPaths.push({
        path: `/shop/${handle}`,
        component: 'src/containers/Shop',
        getData: () => ({
          allProducts,
          pageType: handle,
        }),
      });
    });
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/shop/tonals',
        component: 'src/containers/Shop',
        getData: () => ({
          allProducts,
          pageType: 'Tonals',
          types: allProducts.map(product => product.handle),
        }),
      },
      ...productPaths,
      // {
      //   path: '/shop/speckles',
      //   component: 'src/containers/Shop',
      // },
      // {
      //   path: '/shop/kits',
      //   component: 'src/containers/Shop',
      // },
      // {
      //   path: '/shop/lumos',
      //   component: 'src/containers/Shop',
      // },
      // {
      //   path: '/shop/specials',
      //   component: 'src/containers/Shop',
      // },
      // {
      //   path: '/shop/sale',
      //   component: 'src/containers/Shop',
      // },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ];
  },
};
