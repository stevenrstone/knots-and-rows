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
import ImageGallery from '../components/image-gallery';

export default withRouteData(({ product }) => (
  <React.Fragment>
    <Head>
      <title>{`Knots and Rows | ${product ? product.title : ''}`}</title>
    </Head>
    <Page>
      <ImageGallery images={product.images} />
    </Page>
  </React.Fragment>
));
