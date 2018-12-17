import React from 'react'; // eslint-disable-line
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

const getCollections = async () => {
  const collections = sortCollections(
    await client.collection.fetchAllWithProducts(),
  );

  return collections;
};

export default {
  Document: ({
    Html, Head, Body, children,
  }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#9f00a7" />
        <meta name="theme-color" content="#fffafa" />
        <meta
          name="og:image"
          content="https://knotsandrows.com/featured-phoenix-rising.jpg"
        />
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  // siteRoot: 'https://knotsandrows.com',
  getSiteData: async () => {
    const collections = await getCollections();
    const allProducts = {};
    allProducts.products = [];

    collections.forEach((collection) => {
      collection.products.forEach((product) => {
        const productWithCollection = product;
        productWithCollection.collection = collection.handle;
        allProducts.products.push(productWithCollection);
      });
    });

    return {
      title: 'Knots and Rows',
      shopifyClientInfo,
      collections,
      allProducts,
    };
  },
  getRoutes: async () => {
    const faqsHtml = marked(faqsContent);
    const aboutHtml = marked(aboutContent);
    const patternsHtml = patternsContent.map(item => marked(item));

    const collections = await getCollections();
    const productPaths = [];

    // unfortunately, I think allProducts needs to be populated in both sitedata (for the cart)
    // and routedata (for /shop/all), since the functions are async. At least it's in the build step and not on the client.
    const allProducts = {};
    allProducts.products = [];

    collections.forEach((collection) => {
      productPaths.push({
        path: `/shop/${collection.handle}`,
        component: 'src/Views/Shop',
        getData: () => ({
          collection,
        }),
      });

      collection.products.forEach((product) => {
        const productWithCollection = product;
        productWithCollection.collection = collection.handle;
        allProducts.products.push(productWithCollection);

        productPaths.push({
          path: `/shop/${collection.handle}/${product.handle}`,
          component: 'src/Views/Product',
          getData: () => ({
            product,
            collections,
          }),
        });
      });
    });

    productPaths.push({
      path: '/shop/all',
      component: 'src/Views/Shop',
      getData: () => ({
        collection: allProducts,
      }),
    });

    const patternsPaths = [];
    patterns.forEach((pattern, index) => {
      patternsPaths.push({
        path: `/patterns/${pattern.split('.')[0]}`,
        component: 'src/Views/Pattern',
        getData: () => ({
          patternHtml: patternsHtml[index],
        }),
      });
    });
    return [
      {
        path: '/',
        component: 'src/Views/Home',
        getData: () => ({
          featuredProducts,
        }),
      },
      {
        path: '/frequently-asked-questions',
        component: 'src/Views/FAQs',
        getData: () => ({
          faqsHtml,
        }),
      },
      {
        path: '/about',
        component: 'src/Views/About',
        getData: () => ({
          aboutHtml,
        }),
      },
      {
        path: '/contact',
        component: 'src/Views/Contact',
      },
      {
        path: 'patterns',
        component: 'src/Views/PatternList',
        getData: () => ({
          patterns,
        }),
      },
      ...productPaths,
      ...patternsPaths,
      {
        is404: true,
        component: 'src/Views/404',
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
