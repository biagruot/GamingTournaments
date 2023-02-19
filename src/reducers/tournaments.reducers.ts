import { Reducer } from 'redux';
import {
  TOURNAMENTS_FETCH_REQUESTED,
  TOURNAMENTS_FETCH_SUCCEEDED,
  TOURNAMENTS_FETCH_FAILED,
  TOURNAMENTS_ADD_SUCCEEDED,
  TOURNAMENTS_EDIT_SUCCEEDED,
  TOURNAMENTS_DELETE_SUCCEEDED,
  TOURNAMENTS_UPDATE_UI_STATUS,
  TOURNAMENTS_ADD_REQUESTED,
  TOURNAMENTS_ADD_FAILED,
  TOURNAMENTS_EDIT_FAILED,
  TOURNAMENTS_DELETE_FAILED,
} from '../actions/action.types';
import { ITournamentsState, UIStatus } from '../models';

const initialState = {
  items: [],
  uiStatus: UIStatus.IDLE,
};

export const tournaments: Reducer<ITournamentsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TOURNAMENTS_FETCH_REQUESTED:
      return {
        ...state,
        uiStatus: UIStatus.LOADING,
      };
    case TOURNAMENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
      };
    case TOURNAMENTS_FETCH_FAILED:
      return {
        ...state,
        uiStatus: UIStatus.ERROR,
      };
    case TOURNAMENTS_ADD_REQUESTED:
      return {
        ...state,
      };
    case TOURNAMENTS_ADD_SUCCEEDED:
      return {
        items: [action.payload, ...state.items],
        uiStatus: UIStatus.IDLE,
      };
    case TOURNAMENTS_ADD_FAILED:
      return {
        ...state,
        uiStatus: UIStatus.ERROR,
      };
    case TOURNAMENTS_EDIT_SUCCEEDED:
      return {
        ...state,
        items: state.items.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        uiStatus: UIStatus.IDLE,
      };
    case TOURNAMENTS_EDIT_FAILED:
      return {
        ...state,
        uiStatus: UIStatus.ERROR,
      };
    case TOURNAMENTS_DELETE_SUCCEEDED:
      return {
        ...state,
        items: state.items.filter((t) => t.id !== action.payload),
        uiStatus: UIStatus.IDLE,
      };
    case TOURNAMENTS_DELETE_FAILED:
      return {
        ...state,
        uiStatus: UIStatus.ERROR,
      };
    case TOURNAMENTS_UPDATE_UI_STATUS:
      return {
        ...state,
        uiStatus: action.payload,
      };
    default:
      return state;
  }
};
