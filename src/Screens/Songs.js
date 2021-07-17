import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import ImageHeaderScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import SongView from '../Components/SongView';

import {connect} from 'react-redux';
import {
  setPlayerState,
  setSelectedSong,
  getSongs,
  shuffleSongs,
} from '../Services/redux/action';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();
const topMargin =
  Platform.OS === 'android'
    ? 5
    : statusBarHeight && statusBarHeight > 20
    ? statusBarHeight
    : statusBarHeight;

const MIN_HEIGHT = Platform.OS === 'ios' ? 55 + topMargin : 55;
const MAX_HEIGHT = 350;

// eslint-disable-next-line no-unused-vars
const Songs = ({
  navigation,
  selectedSong,
  setPlayerState,
  setSelectedSong,
  songs,
  playerState,
  shuffleSongs,
}) => {
  const navTitleView = useRef(null);
  const shuffleAll = () => {
    if (shuffleSongs) {
      shuffleSongs();
    }
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        marginBottom: playerState && playerState === 'mini' ? 100 : null,
      }}>
        <StatusBar backgroundColor="darkgray"/>
      <ImageHeaderScrollView
        showsVerticalScrollIndicator={false}
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image
            source={require('../../assets/images/songs_header.png')}
            style={styles.image}
          />
        )}
        renderForeground={() => (
          <View
            style={{
              flex: 1,
              marginVertical: 46,
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text style={styles.imageTitle}>Top Charts</Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={3}
                style={{...styles.imageTitle, fontSize: 17}}>
                Here you go with fresh beats of this month
              </Text>
            </View>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text
              style={{
                color: 'black',
                backgroundColor: 'transparent',
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {'Top Charts'}
            </Text>
          </Animatable.View>
        )}>
        <TriggeringView
          onBeginHidden={() => {
            navigation.setParams({isHeaderImageHidden: true});
            navTitleView.current.fadeInUp(200);
            StatusBar.setBarStyle('dark-content');
          }}
          onDisplay={() => {
            navigation.setParams({isHeaderImageHidden: false});
            navTitleView.current.fadeOut(100);
            StatusBar.setBarStyle('light-content');
          }}
        />

        {/* Top Buttons */}
        <View style={{marginHorizontal: '8%', marginTop: 10}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#353c46',
                borderRadius: 25,
                paddingHorizontal: 10,
                paddingVertical: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 90,
              }}
              onPress={() => {
                if (songs && songs.length > 0) {
                  setSelectedSong(songs[0]);
                  setPlayerState('mini');
                }
              }}>
              <Text style={{color: '#b7b7b7', fontWeight: '600', fontSize: 13}}>
                Play All
              </Text>
              <Image
                style={{width: 11, height: 13}}
                source={require('../../assets/icons/play.png')}
                resizeMode={'stretch'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#353c46',
                borderRadius: 25,
                paddingHorizontal: 10,
                paddingVertical: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 110,
              }}
              onPress={shuffleAll}>
              <Text style={{color: '#b7b7b7', fontWeight: '600', fontSize: 13}}>
                Shuffle All
              </Text>
              <Image
                style={{width: 16, height: 13}}
                source={require('../../assets/icons/shuffle.png')}
                resizeMode={'stretch'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Songs List */}
        <FlatList
          style={{paddingHorizontal: 15, marginVertical: 10, paddingBottom: 20}}
          keyboardShouldPersistTaps="always"
          data={songs}
          keyExtractor={(item) => item.ID}
          renderItem={({item}) => {
            return (
              <SongView
                navigation={navigation}
                item={item}
                isPlaying={item.ID === selectedSong.ID}
                onPlay={() => {
                  setSelectedSong(item);
                  setPlayerState('mini');
                }}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </ImageHeaderScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    selectedSong: state.selectedSong,
    playerState: state.playerState,
  };
};
export default connect(mapStateToProps, {
  getSongs,
  setPlayerState,
  setSelectedSong,
  shuffleSongs,
})(Songs);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
    fontWeight: 'bold',
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? topMargin : 5,
    opacity: 0,
    backgroundColor: '#fff',
  },
  navTitle: {
    color: 'black',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
});
