import React from 'react';
import { withRouteData, Head } from 'react-static';
import styled, { css } from 'react-emotion';
// import theme from '../theme';
// import Nav from '../components/nav';
// import Afterbar from '../components/after-bar';
import Page from '../components/page';
import Paragraph from '../components/paragraph';
import ProductTile from '../components/product-tile';
import NavLink from '../components/nav-link';

const ProductListing = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  &::after {
    content: '';
    flex: auto;
  }
`;

const ContactLink = css`
  margin: 0;
`;

export default withRouteData(({ collections = [], collection = [] }) => (
  <React.Fragment>
    <Head>
      <title>{`Knots and Rows | Premium Hand-dyed Yarn ${
        collection ? ` | ${collection.title}` : ''
      }`}</title>
    </Head>
    <Page title="Knots and Rows">
      <ProductListing>
        {collections.products && collections.products.length > 0 ? (
          collection.products.map(product => (
            <ProductTile
              url={product.handle}
              img={product.images[0].src}
              alt={product.title}
              title={product.title}
              price="$12-$20"
              key={product.handle}
            />
          ))
        ) : (
          <Paragraph>
            All of our {collection.title} items are out of stock right now!{' '}
            <NavLink className={ContactLink} to="/contact">
              You can let us know what you're looking for
            </NavLink>
            , or try again later.
          </Paragraph>
        )}
      </ProductListing>
    </Page>
  </React.Fragment>
));
