import {songs} from '../../data';

export const ActionTypes = {
  GET_SONGS: 'GET_SONGS',
  SHUFFLE_SONGS: 'SHUFFLE_SONGS',
  SET_PLAYER_STATE: 'SET_PLAYER_STATE',
  SET_SELECTED_SONG: 'SET_SELECTED_SONG',
};

export const getSongs = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.GET_SONGS,
      payload: songs,
    });
  };
};

export const shuffleSongs = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SHUFFLE_SONGS,
      payload: null,
    });
  };
};

export const setPlayerState = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PLAYER_STATE,
      payload: payload,
    });
  };
};

export const setSelectedSong = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_SONG,
      payload: payload,
    });
  };
};
