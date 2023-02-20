import React from 'react';
import { render } from '@testing-library/react';
import { TournamentCard } from '../tournamentCard';
import { ITournament } from '../../../models';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  tournaments,
  initialState,
} from '../../../reducers/tournaments.reducers';

const mockTournament: ITournament = {
  id: '1',
  name: 'Tournament 1',
  organizer: 'Dolore',
  game: ['Counter-Strike: Global Offensive'],
  participants: {
    current: 10,
    max: 20,
  },
  startDate: '2022-03-05T13:00:00.000Z',
};

describe('TournamentCard', () => {
  const store = createStore(tournaments, initialState, applyMiddleware(thunk));

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  it('renders the tournament details', () => {
    const { getByText } = render(
      <TournamentCard tournament={mockTournament} />,
      { wrapper: Wrapper }
    );

    const formattedDate = new Date(mockTournament.startDate).toLocaleString(
      'en-GB'
    );

    expect(
      getByText(`Organizer: ${mockTournament.organizer}`)
    ).toBeInTheDocument();
    expect(getByText(`Game: ${mockTournament.game}`)).toBeInTheDocument();
    expect(
      getByText(
        `Participants: ${mockTournament.participants.current}/${mockTournament.participants.max}`
      )
    ).toBeInTheDocument();
    expect(getByText(`Date: ${formattedDate}`)).toBeInTheDocument();
  });
});
