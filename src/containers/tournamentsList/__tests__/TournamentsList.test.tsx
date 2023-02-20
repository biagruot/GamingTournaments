import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ITournament, UIStatus } from '../../../models';
import { tournaments } from '../../../reducers/tournaments.reducers';
import {
  selectUIStatus,
  selectTournaments,
} from '../../../selectors/tournaments.selectors';
import { RootState } from '../../../store';
import { TournamentsList } from '../TournamentsList';

jest.mock('../../../selectors/tournaments.selectors');

describe('TournamentsList', () => {
  const mockTournaments: ITournament[] = [
    {
      id: '1',
      name: 'Tournament 1',
      organizer: 'Dolore',
      game: ['Counter-Strike: Global Offensive'],
      participants: {
        current: 10,
        max: 20,
      },
      startDate: '2022-03-05T13:00:00.000Z',
    },
    {
      id: '2',
      name: 'Tournament 2',
      organizer: 'Dolore',
      game: ['Counter-Strike: Global Offensive'],
      participants: {
        current: 20,
        max: 40,
      },
      startDate: '2022-02-05T13:00:00.000Z',
    },
  ];

  const initialState: RootState = {
    tournaments: {
      uiStatus: UIStatus.IDLE,
      items: mockTournaments,
    },
  };

  beforeEach(() => {
    (selectUIStatus as jest.Mock).mockReturnValue('idle');
    (selectTournaments as jest.Mock).mockReturnValue(mockTournaments);
  });

  test('renders the list of tournaments', () => {
    const store = createStore(
      combineReducers({
        tournaments,
      }),
      initialState,
      applyMiddleware(thunk)
    );

    render(
      <Provider store={store}>
        <TournamentsList />
      </Provider>
    );

    const tournamentCards = screen.getAllByTestId('tournament-card');
    expect(tournamentCards.length).toBe(mockTournaments.length);
  });
});
