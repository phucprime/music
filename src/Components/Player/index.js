import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Modal,
  Platform,
  Text,
  Image,
  Pressable,
  TouchableOpacity
} from 'react-native';

//import { TouchableOpacity } from "react-native-gesture-handler";
import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';

// import Video from 'react-native-video';
import { Video } from 'expo-av';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {setPlayerState, setSelectedSong} from '../../Services/redux/action';
import {connect} from 'react-redux';

const Player = ({ playerState, selectedSong, songs, setSelectedSong, setPlayerState }) => {

  const [show, setShow] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [paused, setPaused] = useState(true);
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);

  useEffect(() => {
    if (playerState) {
      if (playerState === 'full' || playerState === 'mini') {
        setShow(true);
      }
    }
  }, [playerState]);

  useEffect(() => {
    if (selectedSong && selectedSong.ID) {
      // audioElement.current && audioElement.current.seek(0); // bug //
      audioElement.current &&
        audioElement.current.setStatusAsync({ shouldPlay: true, positionMillis: 0 });
      setCurrentPosition(0);
      setTotalLength(1);
      setPaused(false);
      setIsChanging(false);
    }
  }, [selectedSong]);

  const setDuration = (data) => {
    setTotalLength(Math.floor(data.durationMillis));
    setPaused(false);
  };

  const setTime = (data) => {
    data.positionMillis &&
      setCurrentPosition(data.positionMillis);
  };

  const seek = (seekTime) => {
    const time = Math.round(seekTime);
    // audioElement && audioElement.current.seek(time); // bug //
    audioElement &&
      audioElement.current.setStatusAsync({ positionMillis: seekTime });
    setCurrentPosition(time);
    setPaused(false);
  };

  const onBack = () => {
    if (selectedSong && selectedSong.ID && songs && songs.length > 0) {
      const selectedSongIndex = songs.findIndex((song) => 
        song.ID === selectedSong.ID
      );
      const previousSong = songs[selectedSongIndex - 1];
      if (previousSong && previousSong.ID) {
        setIsChanging(true);
        setSelectedSong(previousSong);
        setShouldPlay(true);
      }
    }
  };

  const onForward = () => {
    if (selectedSong && selectedSong.ID && songs && songs.length > 0) {
      const selectedSongIndex = songs.findIndex((song) => 
        song.ID === selectedSong.ID
      );
      const nextSong = songs[selectedSongIndex + 1];
      if (nextSong && nextSong.ID) {
        setIsChanging(true);
        setSelectedSong(nextSong);
        setShouldPlay(true);
      }
    }
  };

  const track = selectedSong && selectedSong.ID ? selectedSong : {};
  const audioElement = useRef();

  const video = isChanging ? null : (
    <Video
      source={{ uri: track.MEDIA_URL }}
      ref={audioElement}
      paused={paused}
      resizeMode="cover" // Fill the whole screen at aspect ratio.
      isLooping
      onLoad={setDuration}
      onEnd={onForward}
      shouldPlay={shouldPlay}
      onError={() => {console.log(error)}}
      style={styles.audioElement}
      volume={1}
      onPlaybackStatusUpdate={setTime}
      progressUpdateIntervalMillis={1000}
    />
  );

  const pad = (n, width, z = 0) => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  const minutesAndSeconds = (position) => [
    pad(Math.floor((position / 1000) / 60), 2),
    pad(((position / 1000) % 60).toFixed(0), 2)
  ];

  const elapsed = minutesAndSeconds(currentPosition ? currentPosition : 0);
  const duration = minutesAndSeconds(totalLength ? totalLength : 0);
  const statusBarHeight = getStatusBarHeight();

  const paddingMargin =
    Platform.OS === 'android'
      ? 5
      : statusBarHeight && statusBarHeight > 20
      ? statusBarHeight + 18
      : statusBarHeight + 12;
  
  const shouldPlayerPauseOrPlay = (isPlaying) => {
    setPaused(isPlaying);
    if (isPlaying) {
      setShouldPlay(false);
    } else {
      setShouldPlay(true);
    } 
  }

  return show && playerState && (
    <React.Fragment>

      {video}

      {playerState === 'mini' ? (
        <Pressable
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: '#f0f0f0',
            marginBottom: 20,
            padding: 10,
            shadowColor: 'lightgray',
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.8,
            elevation: 5
          }}
          onPress={() => setPlayerState('full')}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={()=>setPlayerState('full')}>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={{uri: track.ART_URL}}
                  resizeMode={'stretch'}
                />
              </TouchableOpacity>
            </View>

            <View style={{flex: 0.35}}>
              <Text style={{fontSize: 14}}>{track.NAME}</Text>
              <Text style={{fontSize: 12}}>{track.ARTIST}</Text>
              {elapsed  && duration  ? (
                <Text>{`${elapsed[0]}:${elapsed[1]} - ${duration[0]}:${duration[1]}`}</Text>
              ) : (
                <Text>00:00 - 00:00</Text>
              )}
            </View>

            <View
              style={{
                flex: 0.45,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={onBack}>
                <Image
                  style={{
                    height: 50,
                    width: 50
                  }}
                  source={require('../../../assets/icons/backward_mini_player.png')}
                  resizeMode={'stretch'}
                />
              </TouchableOpacity>

              {paused ? (
                <TouchableOpacity
                  onPress={() => shouldPlayerPauseOrPlay(false)}
                  style={{
                    backgroundColor: '#e4e4e4',
                    borderRadius: 25,
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: 25,
                      width: 25,
                      marginLeft: 5
                    }}
                    source={require('../../../assets/icons/play_mini_player.png')}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => shouldPlayerPauseOrPlay(true)}>
                  <Image
                    style={{
                      height: 50,
                      width: 50
                    }}
                    source={require('../../../assets/icons/pause_mini_player.png')}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onForward}>
                <Image
                  style={{
                    height: 50,
                    width: 50
                  }}
                  source={require('../../../assets/icons/forward_mini_player.png')}
                  resizeMode={'stretch'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      ) : (
        <Modal transparent={true} animationType={'slide'} visible={show}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgb(4,4,4)',
              paddingTop: paddingMargin,
            }}
          >
            <Header
              onDownPress={() => setPlayerState('mini')}
              message="Playing From Charts"
            />
            <AlbumArt url={track.ART_URL} />
            <TrackDetails title={track.NAME} artist={track.ARTIST} />
            <SeekBar
              onSeek={seek}
              trackLength={totalLength}
              onSlidingStart={() => setPaused(true)}
              currentPosition={currentPosition}
            />
            <Controls
              onPressRepeat={() => setRepeatOn(!repeatOn)}
              repeatOn={repeatOn}
              shuffleOn={shuffleOn}
              onPressShuffle={() => setShuffleOn(!shuffleOn)}
              onPressPlay={() => shouldPlayerPauseOrPlay(false)}
              onPressPause={() => shouldPlayerPauseOrPlay(true)}
              onBack={onBack}
              onForward={onForward}
              paused={paused}
            />
          </View>
        </Modal>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    playerState: state.playerState,
    selectedSong: state.selectedSong,
    songs: state.songs,
  };
};

export default connect(mapStateToProps, { setSelectedSong, setPlayerState }) (Player);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};
