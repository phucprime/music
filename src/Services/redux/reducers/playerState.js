import {ActionTypes} from '../action';

const initialState = 'none';
//none NoDisplay
//mini MiniPlayer
//full FullScreenPlayer

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAYER_STATE:
      return action.payload;
    default:
      return state;
  }
}
