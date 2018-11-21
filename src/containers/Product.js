import React from 'react';
import { RouteData, Head } from 'react-static';
import styled, { css } from 'astroturf';
// import theme from '../theme';
import Page from '../components/page';
import ProductForm from './product-form-container';
import ImageGallery from '../components/image-gallery';

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
  @import '../theme.scss';

  color: $colorCopy;
  font-family: $fontPrimary;
  font-size: 2rem;
  margin: 0;
`;

const StyledPrice = styled('h2')`
  @import '../theme.scss';

  color: $colorCopy;
  font-family: $fontPrimary;
  font-size: 1.3rem;
  margin: 0.5rem 0;
`;

const styles = css`
  .productDescription {
    @import '../theme.scss';

    color: $colorCopy;
    font-family: $fontPrimary;
  }
`;

const renderPrices = (variants) => {
  const allPrices = [];
  variants.forEach(v => allPrices.push(v.price));
  if (allPrices.length === 1) {
    return `$${allPrices[0]}`;
  }
  allPrices.sort();
  return `$${allPrices[0]} - $${allPrices[allPrices.length - 1]}`;
};

export default () => (
  <RouteData
    render={({ product }) => (
      <React.Fragment>
        <Head>
          <title>{`Knots and Rows | ${product ? product.title : ''}`}</title>
        </Head>
        <Page>
          <FlexParent>
            <ImageGallery images={product.images} />
            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <StyledPrice>{renderPrices(product.variants)}</StyledPrice>
              <ProductForm product={product} store={store} />
              <div
                className={styles.productDescription}
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </ProductInfo>
          </FlexParent>
        </Page>
      </React.Fragment>
    )}
  />
);
