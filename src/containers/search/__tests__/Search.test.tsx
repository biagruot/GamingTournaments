import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { Search } from '../Search';
import {
  initialState,
  tournaments,
} from '../../../reducers/tournaments.reducers';
import thunk from 'redux-thunk';
import { fetchTournamentsRequested } from '../../../actions/tournaments.actions';

describe('Search component', () => {
  const store = createStore(tournaments, initialState, applyMiddleware(thunk));

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  test('it renders the search input', () => {
    const { getByLabelText } = render(<Search />, { wrapper: Wrapper });

    const input = getByLabelText('Search Tournaments');
    expect(input).toBeInTheDocument();
  });

  test('it updates the search query when the input value changes', () => {
    const { getByLabelText } = render(<Search />, { wrapper: Wrapper });
    const input = getByLabelText('Search Tournaments');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  test('it dispatches a fetchTournaments action when the search query changes', () => {
    const { getByLabelText } = render(<Search />, { wrapper: Wrapper });
    const input = getByLabelText('Search Tournaments');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(fetchTournamentsRequested()).toEqual({
      type: 'TOURNAMENTS/FETCH_REQUESTED',
    });
  });

  test('it sets an error message when an invalid search query is entered', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    const { getByLabelText } = render(<Search />, {
      wrapper: Wrapper,
    });

    const input = getByLabelText('Search Tournaments');

    fireEvent.change(input, { target: { value: '1nv@l1d' } });

    expect(alertMock).toHaveBeenCalledTimes(1);

    expect(input).toHaveValue('');
  });
});
