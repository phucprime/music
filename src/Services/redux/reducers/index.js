import {combineReducers} from 'redux';

import songs from './songs';
import playerState from './playerState';
import selectedSong from './selectedSong';

const rootReducer = combineReducers({
  songs,
  playerState,
  selectedSong,
});

export default rootReducer;
