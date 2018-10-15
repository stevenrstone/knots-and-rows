import React from 'react';
import { withRouteData, Head } from 'react-static';
import styled, { css } from 'react-emotion';
import theme from '../theme';
import Page from '../components/page';
import ProductForm from '../components/product-form';
import ImageGallery from '../components/image-gallery';

const FlexParent = styled('div')`
  display: flex;
  width: 100%;
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

const renderPrices = (variants) => {
  const allPrices = [];
  variants.forEach(v => allPrices.push(v.price));
  allPrices.sort();
  return `$${allPrices[0]} - $${allPrices[allPrices.length - 1]}`;
};

export default withRouteData(({ product }) => (
  <React.Fragment>
    <Head>
      <title>{`Knots and Rows | ${product ? product.title : ''}`}</title>
    </Head>
    <Page>
      <FlexParent>
        {console.log(product)}
        <ImageGallery images={product.images} />
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <StyledPrice>{renderPrices(product.variants)}</StyledPrice>
          <ProductForm product={product} />
          <div
            className={productDescription}
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </ProductInfo>
      </FlexParent>
    </Page>
  </React.Fragment>
));
