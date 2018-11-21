import styled from 'astroturf';

const Paragraph = styled('p')`
  @import '../theme.scss';
  color: $colorCopy;
  font-family: $fontPrimary;
  font-size: 16px;
  padding: 0 0.5rem;
`;

export default Paragraph;
