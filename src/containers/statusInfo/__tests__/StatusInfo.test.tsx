import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { tournaments } from '../../../reducers/tournaments.reducers';
import { StatusInfo } from '../StatusInfo';
import { UIStatus } from '../../../models';
import { RootState } from '../../../store';
import { fetchTournamentsRequested } from '../../../actions/tournaments.actions';

describe('StatusInfo', () => {
  const Wrapper: React.FC<
    React.PropsWithChildren<{ initialState: RootState }>
  > = ({ initialState, children }) => {
    return (
      <Provider store={getStoreWithInitialState(initialState)}>
        {children}
      </Provider>
    );
  };

  const getStoreWithInitialState = (initialState: RootState) => {
    const store = createStore(
      combineReducers({
        tournaments,
      }),
      initialState,
      applyMiddleware(thunk)
    );

    return store;
  };

  it('renders idle state correctly', () => {
    const initialState: RootState = {
      tournaments: {
        uiStatus: UIStatus.IDLE,
        items: [],
      },
    };

    const { queryByText } = render(
      <Wrapper initialState={initialState}>
        <StatusInfo />
      </Wrapper>
    );

    expect(queryByText('Loading tournaments ...')).toBeNull();
    expect(queryByText('No tournaments found.')).toBeNull();
    expect(queryByText('Something went wrong.')).toBeNull();
  });

  it('renders no results state correctly', () => {
    const initialState: RootState = {
      tournaments: {
        uiStatus: UIStatus.NO_RESULTS,
        items: [],
      },
    };

    const { getByText } = render(
      <Wrapper initialState={initialState}>
        <StatusInfo />
      </Wrapper>
    );

    expect(getByText('No tournaments found.')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const initialState: RootState = {
      tournaments: {
        uiStatus: UIStatus.ERROR,
        items: [],
      },
    };

    const { getByLabelText, getByText } = render(
      <Wrapper initialState={initialState}>
        <StatusInfo />
      </Wrapper>
    );
    expect(getByText('Something went wrong.')).toBeInTheDocument();

    const retryButton = getByLabelText('Retry');
    fireEvent.click(retryButton);

    expect(fetchTournamentsRequested()).toEqual({
      type: 'TOURNAMENTS/FETCH_REQUESTED',
    });
  });
});
