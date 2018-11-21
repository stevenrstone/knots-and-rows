import React, { Component } from 'react';
import { SiteData } from 'react-static';
import styled from 'astroturf';
import Header from './header';
import Footer from './footer';

const Container = styled('div')`
  @import '../theme.scss';
  background: $colorBackground;
  width: 100%;
`;

const Content = styled('div')`
  background-color: inherit;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

// export default ({ cart, children }) => (
export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props = props;
  }

  render() {
    return (
      <SiteData
        render={({ title }) => (
          <Container>
            <Content>
              <Header title={title} cart={this.props.cart} />
              {this.props.children}
              <Footer />
            </Content>
          </Container>
        )}
      />
    );
  }

  // );
}
