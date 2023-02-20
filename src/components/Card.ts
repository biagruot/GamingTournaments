import styled from 'styled-components';
import theme from '../theme';

const Card = styled.div`
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing(3)};
  background: ${theme.palette.background.base};
`;

export default Card;
