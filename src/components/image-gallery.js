import React, { Component } from 'react';
import { withRouteData, Head } from 'react-static';
import styled, { css } from 'react-emotion';

const StyledImageGallery = styled('div')`
  display: inline-flex;
  flex-basis: 50%;
  flex-direction: column;
  height: 800px;
  max-width: 600px;
  padding-bottom: 3rem;

  @media (max-width: 768px) {
    height: 400px;
    margin: 0 auto;
    width: 90%;
  }
`;

const HeroImage = styled('img')`
  display: inline-block;
  height: 65%;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
`;

const TileContainer = styled('div')`
  align-items: center;
  display: flex;
  height: 35%;
  justify-content: space-between;
  margin-top: 1rem;
  max-width: 100%;
`;

const ImageTile = styled('img')`
  cursor: pointer;
  display: inline-block;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  width: 100%;
`;

const activeImageTile = css`
  position: relative;
  &::after {
    background: rgba(255, 255, 255, 0.6);
    bottom: 0;
    content: '';
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
  }
`;

export default class ImageGallery extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage: 0,
    };
  }

  render() {
    const Tile = styled('div')`
      display: inline-block;
      max-height: 100%;
      flex-basis: ${100 / this.props.images.length - this.props.images.length}%;
      overflow: hidden;
    `;

    const updateSelectedImage = (index) => {
      this.setState({
        selectedImage: index,
      });
    };

    return (
      <StyledImageGallery>
        <HeroImage
          src={
            this.props.images
              ? this.props.images[this.state.selectedImage].src
              : ''
          }
        />
        <TileContainer>
          {this.props.images.map((image, index) => (
            <Tile
              onClick={() => updateSelectedImage(index)}
              className={
                index === this.state.selectedImage ? activeImageTile : ''
              }
              key={image.src}
            >
              <ImageTile src={image.src} alt={image.title} />
            </Tile>
          ))}
        </TileContainer>
      </StyledImageGallery>
    );
  }
}