import styled from 'styled-components';
import theme from '../theme';

export const ActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing(2)};
`;
