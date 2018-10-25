import React from 'react';
import { SiteData } from 'react-static';
import styled from 'react-emotion';
import Header from './header';
import Footer from './footer';
import theme from '../theme';

const Container = styled('div')`
  background: ${theme.colors.background};
  width: 100%;
`;

const Content = styled('div')`
  background-color: inherit;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export default ({ cart, children }) => (
  <SiteData
    render={({ title }) => (
      <Container>
        <Content>
          <Header title={title} cart={cart} />
          {children}
          <Footer />
        </Content>
      </Container>
    )}
  />
);