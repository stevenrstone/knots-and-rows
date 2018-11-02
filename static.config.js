import Client from 'shopify-buy';
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line
import marked from 'marked';
import fs from 'fs';
import { sortCollections } from './content/collections';

const shopifyClientInfo = {
  domain: 'knots-and-rows.myshopify.com',
  storefrontAccessToken: 'c5e395cbd4faee4e096030b725ebd1ef',
};

const client = Client.buildClient(shopifyClientInfo);

// fetch(faqsContent).then(response => response.text).then(text => )
const faqsContent = fs.readFileSync('./content/faqs.md', 'utf8');
const aboutContent = fs.readFileSync('./content/about.md', 'utf8');

export default {
  getSiteData: () => ({
    title: 'Knots and Rows',
    shopifyClientInfo,
  }),
  getRoutes: async () => {
    const collections = sortCollections(
      await client.collection.fetchAllWithProducts(),
    );
    const faqsHtml = marked(faqsContent);
    const aboutHtml = marked(aboutContent);

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

      collection.products.forEach((product) => {
        productPaths.push({
          path: `/shop/${collection.handle}/${product.handle}`,
          component: 'src/containers/Product',
          getData: () => ({
            product,
            collections,
          }),
        });
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
      {
        path: '/faqs',
        component: 'src/containers/FAQs',
        getData: () => ({
          collections,
          faqsHtml,
        }),
      },
      {
        path: '/about',
        component: 'src/containers/About',
        getData: () => ({
          collections,
          aboutHtml,
        }),
      },
      ...productPaths,
      {
        is404: true,
        component: 'src/containers/404',
      },
    ];
  },
};
