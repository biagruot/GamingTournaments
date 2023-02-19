/**
 * Interface representing the state of the tournaments.
 * @interface
 * @property {Array<ITournament>} items - The list of tournaments.
 * @property {UIStatus} uiStatus - The current UI status of the app.
 */
export interface ITournamentsState {
  items: Array<ITournament>;
  uiStatus: UIStatus;
}

/**
 * Interface representing a tournament.
 * @interface
 * @property {string} id - The unique ID of the tournament.
 * @property {string} name - The name of the tournament.
 * @property {string} organizer - The name of the tournament's organizer.
 * @property {Array<string>} game - The game that the tournament is being played in.
 * @property {IParticipants} participants - The number of participants in the tournament.
 * @property {string} startDate - The date when the tournament starts.
 */
export interface ITournament {
  id: string;
  name: string;
  organizer: string;
  game: Array<string>;
  participants: IParticipants;
  startDate: string;
}

/**
 * Interface representing the number of participants in a tournament.
 * @interface
 * @property {number} current - The current number of participants.
 * @property {number} max - The maximum number of participants.
 */
export interface IParticipants {
  current: number;
  max: number;
}

/**
 * Enumeration representing the possible UI statuses of the app.
 * @enum {string}
 * @property {string} IDLE - The default UI status.
 * @property {string} NO_RESULTS - The UI status when there are no results.
 * @property {string} LOADING - The UI status when the app is loading.
 * @property {string} ERROR - The UI status when there is an error.
 */
export enum UIStatus {
  IDLE = 'idle',
  NO_RESULTS = 'no_results',
  LOADING = 'loading',
  ERROR = 'error',
}
