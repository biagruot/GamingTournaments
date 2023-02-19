import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ITournament, UIStatus } from '../models';
import { RootState } from '../store';
import {
  TOURNAMENTS_FETCH_REQUESTED,
  TOURNAMENTS_FETCH_SUCCEEDED,
  TOURNAMENTS_FETCH_FAILED,
  TOURNAMENTS_UPDATE_UI_STATUS,
  TOURNAMENTS_ADD_FAILED,
  TOURNAMENTS_ADD_REQUESTED,
  TOURNAMENTS_ADD_SUCCEEDED,
  TOURNAMENTS_DELETE_FAILED,
  TOURNAMENTS_DELETE_REQUESTED,
  TOURNAMENTS_DELETE_SUCCEEDED,
  TOURNAMENTS_EDIT_FAILED,
  TOURNAMENTS_EDIT_REQUESTED,
  TOURNAMENTS_EDIT_SUCCEEDED,
} from './action.types';
import { getEndpointURL } from './utils/utils';

//#region Fetch tournaments

/**
 * Thunk action creator to fetch tournaments from the server and dispatch
 * appropriate actions.
 *
 * @returns {ThunkAction<void, RootState, null, AnyAction>} A thunk action
 */
export const fetchTournaments =
  (query?: string): ThunkAction<void, RootState, null, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(fetchTournamentsRequested());

      // Wait for 500ms after setting the LOADING status to avoid flickering
      const loadingDelay = new Promise((resolve) => setTimeout(resolve, 500));
      await loadingDelay;

      const endpointURL = getEndpointURL(query);

      const response = await fetch(endpointURL);
      if (!response.ok) {
        throw new Error('Failed to fetch tournaments');
      }
      const tournaments: Array<ITournament> = await response.json();

      if (tournaments.length === 0) {
        dispatch(updateUiStatus(UIStatus.NO_RESULTS));
      } else {
        dispatch(updateUiStatus(UIStatus.IDLE));
      }

      dispatch(fetchTournamentsSucceeded(tournaments));
    } catch (error) {
      console.error(error);
      dispatch(fetchTournamentsFailed());
    }
  };

/**
 * AnyAction creator to indicate that tournaments fetch has been requested.
 *
 * @returns {AnyAction} An action with type TOURNAMENTS_FETCH_REQUESTED
 */
export const fetchTournamentsRequested = (): AnyAction => ({
  type: TOURNAMENTS_FETCH_REQUESTED,
});

/**
 * AnyAction creator to indicate that tournaments fetch has succeeded.
 *
 * @param {Array<ITournament>} tournaments The tournaments fetched from the server
 *
 * @returns {AnyAction} An action with type TOURNAMENTS_FETCH_SUCCEEDED and the tournaments payload
 */
export const fetchTournamentsSucceeded = (
  tournaments: Array<ITournament>
): AnyAction => ({
  type: TOURNAMENTS_FETCH_SUCCEEDED,
  payload: tournaments,
});

/**
 * AnyAction creator to indicate that tournaments fetch has failed.
 *
 * @returns {AnyAction} An action with type TOURNAMENTS_FETCH_FAILED and the error payload
 */
export const fetchTournamentsFailed = (): AnyAction => ({
  type: TOURNAMENTS_FETCH_FAILED,
});

//#endregion

//#region Add tournament

/**
 * Thunk action creator that adds a new tournament to the server
 *
 * @param name The name of the tournament to add
 */
export const addTournament =
  (name: string): ThunkAction<void, RootState, null, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(addTournamentRequested());

      const response = await fetch(getEndpointURL(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to add tournament');
      }

      const tournament = await response.json();

      dispatch(addTournamentSucceeded(tournament));
    } catch (error) {
      console.error(error);
      dispatch(addTournamentFailed());
    }
  };

/**
 * Action creator for indicating that the request to add a tournament has been made.
 *
 * @returns {object} An action object with the type TOURNAMENTS_ADD_REQUESTED.
 */
export const addTournamentRequested = () => ({
  type: TOURNAMENTS_ADD_REQUESTED,
});

/**
 * Action creator for indicating that the request to add a tournament has succeeded.
 *
 * @returns {object} An action object with the type TOURNAMENTS_ADD_SUCCEEDED and the added tournament as payload.
 */
export const addTournamentSucceeded = (tournament: ITournament) => ({
  type: TOURNAMENTS_ADD_SUCCEEDED,
  payload: tournament,
});

/**
 * Action creator for indicating that the request to add a tournament has failed.
 *
 * @param {object} error - The error that caused the request to fail.
 * @returns {object} An action object with the type TOURNAMENTS_ADD_FAILED and the error as payload.
 */
export const addTournamentFailed = () => ({
  type: TOURNAMENTS_ADD_FAILED,
});

//#endregion

//#region Edit tournament

/**
 * Edit a tournament by making a PUT request to the API and dispatching appropriate actions.
 *
 * @param tournament - The tournament to edit.
 * @returns A thunk function that asynchronously dispatches actions.
 */
export const editTournament =
  (tournament: ITournament): ThunkAction<void, RootState, null, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(editTournamentRequested());

      const response = await fetch(getEndpointURL('', tournament.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournament),
      });

      if (!response.ok) {
        throw new Error('Failed to edit tournament');
      }

      dispatch(editTournamentSucceeded(tournament));
    } catch (error) {
      console.error(error);
      dispatch(editTournamentFailed());
    }
  };

/**
 * Action creator for an edit tournament requested action.
 *
 * @returns An action object.
 */
export const editTournamentRequested = () => ({
  type: TOURNAMENTS_EDIT_REQUESTED,
});

/**
 * Action creator for an edit tournament succeeded action.
 *
 * @param tournament - The edited tournament.
 * @returns An action object.
 */
export const editTournamentSucceeded = (tournament: ITournament) => ({
  type: TOURNAMENTS_EDIT_SUCCEEDED,
  payload: tournament,
});

/**
 * Action creator for an edit tournament failed action.
 *
 * @returns An action object.
 */
export const editTournamentFailed = () => ({
  type: TOURNAMENTS_EDIT_FAILED,
});

//#endregion

//#region Delete tournament

/**
 * Action creator that initiates the deletion of a tournament.
 *
 * @param {string} id The ID of the tournament to be deleted.
 * @returns {ThunkAction<void, RootState, null, Action>} A thunk action that deletes a tournament.
 */
export const deleteTournament =
  (id: string): ThunkAction<void, RootState, null, Action> =>
  async (dispatch) => {
    try {
      dispatch(deleteTournamentRequested());

      const response = await fetch(getEndpointURL('', id.toString()), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tournament');
      }

      dispatch(deleteTournamentSucceeded(id));
    } catch (error) {
      console.error(error);
      dispatch(deleteTournamentFailed());
    }
  };

/**
 * Action creator that returns an action with the type `TOURNAMENTS_DELETE_REQUESTED`.
 *
 * @returns {Action} The action of type `TOURNAMENTS_DELETE_REQUESTED`.
 */
export const deleteTournamentRequested = () => ({
  type: TOURNAMENTS_DELETE_REQUESTED,
});

/**
 * Action creator that returns an action with the type `TOURNAMENTS_DELETE_SUCCEEDED`.
 *
 * @param {string} id The ID of the tournament that has been successfully deleted.
 * @returns {Action} The action of type `TOURNAMENTS_DELETE_SUCCEEDED`.
 */
export const deleteTournamentSucceeded = (id: string) => ({
  type: TOURNAMENTS_DELETE_SUCCEEDED,
  payload: id,
});

/**
 * Action creator that returns an action with the type `TOURNAMENTS_DELETE_FAILED`.
 *
 * @returns {Action} The action of type `TOURNAMENTS_DELETE_FAILED`.
 */
export const deleteTournamentFailed = () => ({
  type: TOURNAMENTS_DELETE_FAILED,
});

//#endregion

//#region UI status

/**
 * AnyAction creator to update the UI status for tournaments.
 *
 * @param {UIStatus} uiStatus The new UI status for tournaments
 *
 * @returns {AnyAction} An action with type TOURNAMENTS_UPDATE_UI_STATUS and the UI status payload
 */
export const updateUiStatus = (uiStatus: UIStatus): AnyAction => ({
  type: TOURNAMENTS_UPDATE_UI_STATUS,
  payload: uiStatus,
});

//#endregion
