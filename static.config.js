import Client from 'shopify-buy';
// fetch is necessary for shopify
import fetch from 'isomorphic-fetch'; // eslint-disable-line
import marked from 'marked';
import fs from 'fs';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import { sortCollections } from './content/collections';
import featuredProducts from './content/featured-products';

const shopifyClientInfo = {
  domain: 'knots-and-rows.myshopify.com',
  storefrontAccessToken: 'c5e395cbd4faee4e096030b725ebd1ef',
};

const client = Client.buildClient(shopifyClientInfo);

const faqsContent = fs.readFileSync('./content/faqs.md', 'utf8');
const aboutContent = fs.readFileSync('./content/about.md', 'utf8');
const patterns = fs.readdirSync('./content/patterns/', 'utf8');
const patternsContent = patterns.map(item => fs.readFileSync(`./content/patterns/${item}`, 'utf8'));

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
    const patternsHtml = patternsContent.map(item => marked(item));

    const productPaths = [];
    const featuredProductsArr = [];
    collections.forEach((collection) => {
      productPaths.push({
        path: `/shop/${collection.handle}`,
        component: 'src/Views/Shop',
        getData: () => ({
          collection, // necessary for the page render
          collections, // necessary for the nav
        }),
      });

      collection.products.forEach((product) => {
        productPaths.push({
          path: `/shop/${collection.handle}/${product.handle}`,
          component: 'src/Views/Product',
          getData: () => ({
            product,
            collections,
          }),
        });
        if (featuredProducts.includes(product.title.toLowerCase())) {
          featuredProductsArr.push({
            url: `/shop/${collection.handle}/${product.handle}`,
            imageUrl: product.images[0].src,
            title: product.title,
          });
        }
      });
    });

    const patternsPaths = [];
    patterns.forEach((pattern, index) => {
      patternsPaths.push({
        path: `/patterns/${pattern.split('.')[0]}`,
        component: 'src/Views/Pattern',
        getData: () => ({
          collections,
          patternHtml: patternsHtml[index],
        }),
      });
    });
    return [
      {
        path: '/',
        component: 'src/Views/Home',
        getData: () => ({
          collections,
          featuredProducts: featuredProductsArr,
        }),
      },
      {
        path: '/frequently-asked-questions',
        component: 'src/Views/FAQs',
        getData: () => ({
          collections,
          faqsHtml,
        }),
      },
      {
        path: '/about',
        component: 'src/Views/About',
        getData: () => ({
          collections,
          aboutHtml,
        }),
      },
      {
        path: '/contact',
        component: 'src/Views/Contact',
        getData: () => ({
          collections,
        }),
      },
      {
        path: 'patterns',
        component: 'src/Views/PatternList',
        getData: () => ({
          collections,
          patterns,
        }),
      },
      ...productPaths,
      ...patternsPaths,
      {
        is404: true,
        component: 'src/Views/404',
        getData: () => ({
          collections,
        }),
      },
    ];
  },
  webpack: (config) => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        cacheId: 'knots-and-rows',
        filename: 'krsw.js',
        minify: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn.shopify.com\//,
            handler: 'cacheFirst',
          },
        ],
      }),
    );
    return config;
  },
};
