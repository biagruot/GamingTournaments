import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  deleteTournament,
  editTournament,
} from '../../actions/tournaments.actions';
import Button from '../../components/Button';
import Card from '../../components/Card';
import H6 from '../../components/H6';
import { ITournament } from '../../models';
import { AppDispatch } from '../../store';
import theme from '../../theme';
import { isValidName } from '../../utils/isValidName';

interface ITournamentcardProps {
  tournament: ITournament;
}

export const TournamentCard: React.FC<ITournamentcardProps> = ({
  tournament,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const editHandler = () => {
    const name = prompt('New Tournament Name:', tournament.name);

    if (!name || name === tournament.name) {
      return;
    }

    if (!isValidName(name)) {
      alert(
        'Invalid name, please enter only Latin letters, numbers, and spaces.'
      );
      return;
    }

    dispatch(
      editTournament({
        ...tournament,
        name,
      })
    );
  };

  const deleteHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDeletion = confirm(
      'Do you really want to delete this tournament?'
    );

    if (!confirmDeletion) {
      return;
    }

    dispatch(deleteTournament(tournament.id));
  };

  return (
    <Card>
      <H6>{tournament.name}</H6>
      <ul>
        <li>Organizer: {tournament.organizer}</li>
        <li>Game: {tournament.game}</li>
        <li>
          Participants: {tournament.participants.current}/
          {tournament.participants.current}
        </li>
        <li>Date: {formatDate(tournament.startDate)}</li>
      </ul>
      <ButtonsWrapper>
        <Button aria-label="Edit tournament" onClick={editHandler}>
          EDIT
        </Button>
        <Button aria-label="Delete tournament" onClick={deleteHandler}>
          DELETE
        </Button>
      </ButtonsWrapper>
    </Card>
  );
};

const formatDate = (date: string) => new Date(date).toLocaleString('en-GB');

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: ${theme.spacing(3)};
  gap: ${theme.spacing(2)};
`;
