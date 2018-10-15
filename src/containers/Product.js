import React from 'react';
import { withRouteData, Head } from 'react-static';
import styled, { css } from 'react-emotion';
import theme from '../theme';
import Page from '../components/page';
import Paragraph from '../components/paragraph';
import ProductTile from '../components/product-tile';
import StyledLink from '../components/styled-link';
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

const Form = styled('form')`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const InputField = styled('div')`
  box-sizing: border-box;
  padding-top: 1.5rem;
  position: relative;

  &:first-child {
    flex-grow: 3;
    margin-right: 0.5rem;
  }
`;

const InputLabel = styled('label')`
  color: ${theme.colors.copy};
  font-family: ${theme.fonts.primary};
  font-size: 1rem;
  left: 0;
  position: absolute;
  top: 0;
`;

const inputClass = css`
  box-sizing: border-box;
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.primary};
  height: 3.5rem;
  padding: 1rem;
  width: 100%;
`;

const AddToCart = styled('button')`
  background-color: ${theme.colors.bars};
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0;
  width: 100%;
`;

const renderPrices = (variants) => {
  const allPrices = [];
  variants.forEach(v => allPrices.push(v.price));
  allPrices.sort();
  return `$${allPrices[0]} - $${allPrices[allPrices.length - 1]}`;
};

const renderOptions = variants => variants.map(
  v => (v.available ? (
        <option value={v.id} key={v.id}>{`${v.title} (${v.price})`}</option>
  ) : null),
);

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
          <Form>
            <InputField>
              <InputLabel htmlFor="weight">Weight</InputLabel>
              <select className={inputClass} name="weight">
                {renderOptions(product.variants)}
              </select>
            </InputField>

            <InputField>
              <InputLabel htmlFor="quantity">Quantity</InputLabel>
              <input
                className={inputClass}
                type="number"
                minimum="1"
                step="1"
                name="quantity"
                defaultValue="1"
              />
            </InputField>
          </Form>

          <AddToCart type="button">Add to Cart</AddToCart>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </ProductInfo>
      </FlexParent>
    </Page>
  </React.Fragment>
));
