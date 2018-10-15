import React from 'react';
import { withRouteData, Head } from 'react-static';
import styled, { css } from 'react-emotion';
// import theme from '../theme';
// import Nav from '../components/nav';
// import Afterbar from '../components/after-bar';
import Page from '../components/page';
import Paragraph from '../components/paragraph';
import ProductTile from '../components/product-tile';
import StyledLink from '../components/styled-link';

const ProductFlex = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default withRouteData(({ collection = [] }) => (
  <React.Fragment>
    <Head>
      <title>{`Knots and Rows | Premium Hand-dyed Yarn ${
        collection ? ` | ${collection.title}` : ''
      }`}</title>
    </Head>
    <Page>
      <ProductFlex>
        {collection.products && collection.products.length > 0 ? (
          collection.products.map(product => (
            <ProductTile
              url={`/shop/${collection.handle}/${product.handle}`}
              img={product.images[0].src}
              alt={product.title}
              title={product.title}
              price="$12-$20"
              key={product.handle}
            />
          ))
        ) : (
          <Paragraph>
            All of our {collection.title} are out of stock right now!{' '}
            <StyledLink className={ContactLink} to="/contact">
              You can let us know what you're looking for
            </StyledLink>
            , or try again later.
          </Paragraph>
        )}
      </ProductFlex>
    </Page>
  </React.Fragment>
));
