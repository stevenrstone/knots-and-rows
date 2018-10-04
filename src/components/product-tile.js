import React from 'react';
import styled, { css } from 'react-emotion';
import FeaturedItem from './featured-item';
import theme from '../theme';

const StyledTile = styled('a')`
  bottom: 0;
  box-sizing: border-box;
  flex-basis: 25%;
  height: auto;
  padding: 1rem 1rem 2rem;
  position: relative;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    box-shadow: 0 0.5rem 1rem 2px rgba(0, 0, 0, 0.8);
    cursor: pointer;
    bottom: 0.5rem;
  }

  &:hover h3,
  &:hover h4 {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    flex-basis: 50%;
  }
`;

const ProductsImage = styled(FeaturedItem)`
  align-self: center;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  width: calc(100% - 1rem);
`;

const ProductTitle = styled('h3')`
  color: ${theme.colors.link};
  font-family: ${theme.fonts.primary};
  font-size: 1.2rem;

  margin: 0.5rem 0;
  padding: 0 1rem 0 0.5rem;
`;

const ProductTile = ({
  url, img, alt, title, price,
}) => (
  <StyledTile href={url}>
    <ProductsImage src={img} alt={alt} />
    {/* title */}
    <ProductTitle>{title}</ProductTitle>
    {/* price */}
    <ProductTitle>{price}</ProductTitle>
  </StyledTile>
);

export default ProductTile;
