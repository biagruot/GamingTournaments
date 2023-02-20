import React from 'react';
import { useDispatch } from 'react-redux';
import { addTournament } from '../../actions/tournaments.actions';
import Button from '../../components/Button';
import { AppDispatch } from '../../store';
import { isValidName } from '../../utils/isValidName';

export const TournamentCreateBtn: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const createHandler = () => {
    const name = prompt('Tournament Name:');

    if (!name) {
      return;
    }

    if (!isValidName(name)) {
      alert(
        'Invalid name, please enter only Latin letters, numbers, and spaces.'
      );
      return;
    }

    dispatch(addTournament(name));
  };

  return (
    <Button aria-label="Create New Tournament" onClick={createHandler}>
      CREATE TOURNAMENT
    </Button>
  );
};
