import React from 'react';
import { RouteData, Head } from 'react-static';
import styled, { css } from 'react-emotion';
import theme from '../theme';
import Page from '../components/page';
import ProductForm from '../containers/product-form-container';
import ImageGallery from '../components/image-gallery';
import { renderPrices } from '../util/products';

import store from '../util/store';

const FlexParent = styled('div')`
  display: flex;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductInfo = styled('div')`
  box-sizing: border-box;
  display: inline-block;
  flex-basis: 50%;
  padding: 0 2rem;
`;

const ProductTitle = styled('h1')`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.primary};
  font-size: 2rem;
  margin: 0;
`;

const StyledPrice = styled('h2')`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.primary};
  font-size: 1.3rem;
  margin: 0.5rem 0;
`;

const productDescription = css`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.primary};
`;

export default () => (
  <RouteData
    render={({ product }) => (
      <React.Fragment>
        <Head>
          <title>{`Knots and Rows | ${product ? product.title : ''}`}</title>
          <meta
            name="description"
            content={`Premium, hand-crafted ${
              product ? product.title : ''
            } yarn from Knots and Rows - perfect for your next knitting or crocheting project`}
          />
          <meta
            name="og:image"
            content="https://knotsandrows.com/featured-phoenix-rising.jpg"
          />
        </Head>
        <Page>
          <FlexParent>
            <ImageGallery images={product.images} />
            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <StyledPrice>{renderPrices(product.variants)}</StyledPrice>
              <ProductForm product={product} store={store} />
              <div
                className={productDescription}
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </ProductInfo>
          </FlexParent>
        </Page>
      </React.Fragment>
    )}
  />
);
