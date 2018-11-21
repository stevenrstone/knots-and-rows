import styled from 'astroturf';

const cls = styled('hr')`
  @import '../theme.scss';

  background: $colorBackground;
  box-shadow: $stylingBoxShadow;
  content: '';
  height: 2px;
  margin: 2rem auto;
  width: 90%;
`;

export default cls;
