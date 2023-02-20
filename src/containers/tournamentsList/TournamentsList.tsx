import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '../../components/Grid';
import { ITournament, UIStatus } from '../../models';
import {
  selectTournaments,
  selectUIStatus,
} from '../../selectors/tournaments.selectors';
import { TournamentCard } from '../tournamentCard/tournamentCard';

export const TournamentsList: React.FC = () => {
  const isIdle = useSelector(selectUIStatus) === UIStatus.IDLE;
  const items: ITournament[] = useSelector(selectTournaments);
  const memoizedItems = useMemo(() => items, [items]);

  return (
    <>
      {isIdle && (
        <Grid>
          {isIdle &&
            memoizedItems.map((item) => (
              <TournamentCard key={item.id} tournament={item} />
            ))}
        </Grid>
      )}
    </>
  );
};
