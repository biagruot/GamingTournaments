import styled from 'styled-components';
import theme from '../theme';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${theme.spacing(70)}, 1fr));
  gap: ${theme.spacing(6)};
  margin-top: ${theme.spacing(6)};

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
