import React, { Component } from 'react'; // eslint-disable-line
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

const TileContainer = styled('div')`
  align-items: center;
  display: flex;
  height: 35%;
  justify-content: space-between;
  margin-top: 1rem;
  max-width: 100%;

  &:empty {
    height: 0;
    margin: 0;
  }
`;

const ImageTile = styled('img')`
  cursor: default;
  display: inline-block;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  width: 100%;
`;

const inactiveImageTile = css`
  cursor: pointer;
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
    const HeroImage = styled('img')`
      display: inline-block;
      height: 65%;
      max-width: 100%;
      object-fit: contain;
      object-position: center;

      @media (max-width: 768px) {
        height: ${this.props.images.length > 1 ? '65%' : '100%'};
      }
    `;

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

    const { images } = this.props;

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
          {images.length > 1
            ? images.map((image, index) => (
                <Tile
                  onClick={() => updateSelectedImage(index)}
                  className={
                    index !== this.state.selectedImage ? inactiveImageTile : ''
                  }
                  key={image.src}
                >
                  <ImageTile src={image.src} alt={image.title} />
                </Tile>
            ))
            : null}
        </TileContainer>
      </StyledImageGallery>
    );
  }
}
