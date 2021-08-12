# Music App

Looking for music?

Start listening to the best new releases.

![gif](https://github.com/phucprime/music/blob/main/assets/music-app.gif)

# Expo AV

The Audio.Sound objects and Video components share a unified imperative API for media playback.

### Installation 
`$ expo install expo-av`

### Usage
```javascript
import { Audio, Video } from 'expo-av';
```

### APIs Feature
• Play media: `playbackObject.playAsync()` this is equivalent to `playbackObject.setStatusAsync({ shouldPlay: true })`

• Play media at a certain time: `playbackObject.playFromPositionAsync(millis)` this is equivalent to `playbackObject.setStatusAsync({ shouldPlay: true, positionMillis: millis })`

• Pause media: `playbackObject.pauseAsync()` this is equivalent to `playbackObject.setStatusAsync({ shouldPlay: false })`

[See more](https://docs.expo.dev/versions/latest/sdk/av/#installation)

# Contributions

Any feature requests and pull requests are welcome!

# License

Image assets via [Spotify](https://spotify.com/)

Sound tracks via [Soundhelix](https://soundhelix.com/)

[MIT license](https://choosealicense.com/licenses/mit/)
