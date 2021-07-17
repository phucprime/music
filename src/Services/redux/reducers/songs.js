import {ActionTypes} from '../action';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_SONGS:
      return action.payload;
    case ActionTypes.SHUFFLE_SONGS: {
      const shuffledSongs = state.sort(() => Math.random() - 0.5);
      return shuffledSongs;
    }
    default:
      return state;
  }
}
