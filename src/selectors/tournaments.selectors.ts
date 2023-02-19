import { ITournament } from '../models';
import { RootState } from '../store';

/**
 * Returns an array of tournaments from the Redux store.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {Array<ITournament>} An array of tournaments.
 */
export const selectTournaments = (state: RootState): Array<ITournament> => {
  return state.tournaments.items;
};

/**
 * Returns the UI status from the Redux store.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {string} The current UI status.
 */
export const selectUIStatus = (state: RootState): string => {
  return state.tournaments.uiStatus;
};
