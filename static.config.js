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
    const collections = await client.collection.fetchAllWithProducts();

    const productPaths = [];
    collections.forEach((collection) => {
      productPaths.push({
        path: `/shop/${collection.handle}`,
        component: 'src/containers/Shop',
        getData: () => ({
          collection, // necessary for the page render
          collections, // necessary for the nav
        }),
      });
    });
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => ({
          collections,
        }),
      },
      // {
      //   path: '/shop/tonals',
      //   component: 'src/containers/Shop',
      //   getData: () => ({
      //     pageType: 'Tonals',
      //     collections,
      //   }),
      // },
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
