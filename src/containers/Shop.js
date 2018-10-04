import React from 'react';
import { withRouteData, Head } from 'react-static';
import styled from 'react-emotion';
// import theme from '../theme';
// import Nav from '../components/nav';
// import Afterbar from '../components/after-bar';
import Page from '../components/page';
import ProductTile from '../components/product-tile';

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

export default withRouteData(({ allProducts = [], pageType }) => (
  <React.Fragment>
    <Head>
      <title>{`Knots and Rows | Premium Hand-dyed Yarn | ${pageType}`}</title>
    </Head>
    <Page title="Knots and Rows">
      <ProductListing>
        {allProducts.map(product => (
          <ProductTile
            url={product.handle}
            img={product.images[0].src}
            alt={product.title}
            title={product.title}
            price="$12-$20"
            key={product.handle}
          />
        ))}
      </ProductListing>
    </Page>
  </React.Fragment>
));
