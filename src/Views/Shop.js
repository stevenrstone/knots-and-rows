import React from 'react';
import { withRouteData, Head } from 'react-static';
import styled from 'react-emotion';
import Page from '../components/page';
import Paragraph from '../components/paragraph';
import ProductTile from '../components/product-tile';
import StyledLink, { InlineLink } from '../components/styled-link';
import { renderPrices } from '../util/products';

const ProductFlex = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default withRouteData(({ collection = [] }) => (
  <React.Fragment>
    <Head>
      <title>{`Knots and Rows | Premium Hand-dyed Yarn ${
        collection && collection.title ? ` | ${collection.title}` : ''
      }`}</title>
      <meta
        name="description"
        content={`Premium, hand-crafted ${
          collection && collection.title ? collection.title : ''
        } from Knots and Rows`}
      />
      <meta
        name="og:image"
        content="https://knotsandrows.com/featured-phoenix-rising.jpg"
      />
    </Head>
    <Page>
      <ProductFlex>
        {collection.products && collection.products.length > 0 ? (
          collection.products.map(product => (
            <ProductTile
              url={`/shop/${collection.handle || product.collection}/${
                product.handle
              }`}
              img={product.images[0].src}
              alt={product.title}
              title={product.title}
              price={renderPrices(product.variants)}
              key={product.handle}
            />
          ))
        ) : (
          <Paragraph>
            All of our {collection.title} are out of stock right now!{' '}
            <StyledLink className={InlineLink} to="/contact">
              You can let us know what you're looking for
            </StyledLink>
            , or try again later.
          </Paragraph>
        )}
      </ProductFlex>
    </Page>
  </React.Fragment>
));
