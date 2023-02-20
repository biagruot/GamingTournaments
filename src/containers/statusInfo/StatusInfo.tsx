import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchTournaments } from '../../actions/tournaments.actions';
import Button from '../../components/Button';
import H6 from '../../components/H6';
import { UIStatus } from '../../models';
import { selectUIStatus } from '../../selectors/tournaments.selectors';
import { AppDispatch } from '../../store';
import theme from '../../theme';

export const StatusInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const uiStatus = useSelector(selectUIStatus);
  const isLoading = uiStatus === UIStatus.LOADING;
  const isError = uiStatus === UIStatus.ERROR;
  const isNoResults = uiStatus === UIStatus.NO_RESULTS;

  const handleRetry = () => {
    dispatch(fetchTournaments());
  };

  return (
    <Wrapper>
      {isLoading && <H6>Loading tournaments ...</H6>}
      {isNoResults && <H6>No tournaments found.</H6>}
      {isError && (
        <Wrapper>
          <H6>Something went wrong.</H6>
          <Button aria-label="Retry" onClick={handleRetry}>
            RETRY
          </Button>
        </Wrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${theme.spacing(6)};
  flex-direction: column;
`;
