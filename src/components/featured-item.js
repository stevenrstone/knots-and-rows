import React from 'react';
import styled from 'astroturf';

const FeaturedItem = styled('img')`
  @import '../theme.scss';
  border: 0.5rem ridge $colorBars;
  display: inline-block;
  flex-basis: 25%;
  object-fit: contain;
  object-position: center;

  @media (max-width: 768px) {
    flex: auto;
    height: auto;
    margin: 2rem auto;
    width: 90%;
  }
`;

export default FeaturedItem;
