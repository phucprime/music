import {ActionTypes} from '../action';

const initialState = {};

// const initialState = {
//   ID: 1,
//   NAME: 'Nethikeppuna',
//   SUBTITLE: 'Enna Usare',
//   ARTIST: 'Milidhane Dinesh',
//   ART_URL:
//     'http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg',
//   MEDIA_URL: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
// };

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_SELECTED_SONG:
      return action.payload;
    default:
      return state;
  }
}
