import React, {useRef, useEffect} from 'react';
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
import {
  albums,
  categories,
  recentlyPlayed,
  popularAlbums,
  artists,
  popularChannels,
} from '../Services/data';
import AlbumView from '../Components/AlbumView';
import CategoryView from '../Components/CategoryView';
import RecentPlayedView from '../Components/RecentPlayedView';
import PopularAlbumView from '../Components/PopularAlbumView';
import ArtistView from '../Components/ArtistView';
import PopularChannelView from '../Components/PopularChannelView';

import {connect} from 'react-redux';
import {
  setPlayerState,
  setSelectedSong,
  getSongs,
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
const Home = ({navigation, playerState, getSongs}) => {
  useEffect(() => {
    navigation.setParams({isHeaderImageHidden: false});
    (async () => {
      await getSongs();
    })();
  }, []);

  const navTitleView = useRef(null);

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
            source={require('../../assets/images/album_header.png')}
            style={styles.image}
          />
        )}
        renderForeground={() => (
          <View
            style={{
              flex: 1,
              marginVertical: 46,
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
              <Image
                source={require('../../assets/icons/applogo_white.png')}
                style={{height: 35, width: 35, marginRight: 5}}
                resizeMode={'stretch'}
              />
              <Text style={styles.imageTitle}>Battu</Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{...styles.imageTitle, fontSize: 29, marginBottom: 5}}>
                All New Baduga
              </Text>
              <Text style={{...styles.imageTitle, fontSize: 29}}>
                Music App
              </Text>
            </View>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Image
              source={require('../../assets/icons/applogo.png')}
              style={{height: 35, width: 35}}
              resizeMode={'stretch'}
            />
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
        {/* Albums */}
        <View style={{paddingHorizontal: 15, marginTop: 20}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Top Charts</Text>
            <Text style={{fontSize: 10, color: '#f39e56', fontWeight: 'bold'}}>
              See All
            </Text>
          </View>
        </View>
        <FlatList
          style={{paddingHorizontal: 15, marginVertical: 10}}
          keyboardShouldPersistTaps="always"
          data={albums}
          keyExtractor={(item) => item.ID}
          renderItem={AlbumView}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        {/* Categories */}
        <View style={{paddingHorizontal: 15, marginTop: 20}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Category</Text>
            <Text style={{fontSize: 10, color: '#f39e56', fontWeight: 'bold'}}>
              See All
            </Text>
          </View>
        </View>
        <FlatList
          style={{paddingHorizontal: 15, marginVertical: 10}}
          keyboardShouldPersistTaps="always"
          data={categories}
          keyExtractor={(item) => item.ID}
          renderItem={CategoryView}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        {/* Recently Played */}
        <View style={{paddingHorizontal: 15}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Recently Played
            </Text>
          </View>
        </View>
        <FlatList
          style={{paddingHorizontal: 15, marginVertical: 10}}
          keyboardShouldPersistTaps="always"
          data={recentlyPlayed.slice(0, 4)}
          keyExtractor={(item) => item.ID}
          renderItem={RecentPlayedView}
          showsVerticalScrollIndicator={false}
        />
        <View style={{paddingHorizontal: 15}}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 25,
              borderColor: '#f18933',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#f18933',
                padding: 10,
              }}>
              Show More
            </Text>
          </TouchableOpacity>
        </View>
        {/* Popular Albums */}
        <View style={{paddingHorizontal: 15, marginTop: 30}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Popular Albums
            </Text>
          </View>
        </View>
        <FlatList
          style={{paddingHorizontal: 15, marginVertical: 10}}
          keyboardShouldPersistTaps="always"
          data={popularAlbums}
          keyExtractor={(item) => item.ID}
          renderItem={({item}) => (
            <PopularAlbumView navigation={navigation} item={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        {/* Artists */}
        <View style={{paddingHorizontal: 15, marginTop: 20}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Artists</Text>
          </View>
        </View>
        <FlatList
          style={{paddingHorizontal: 15, marginVertical: 10}}
          keyboardShouldPersistTaps="always"
          data={artists}
          keyExtractor={(item) => item.ID}
          renderItem={ArtistView}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        {/* Popular Channels */}
        <View style={{paddingHorizontal: 15, marginTop: 20}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Popular Channels
            </Text>
          </View>
        </View>
        <FlatList
          style={{
            paddingHorizontal: 15,
            paddingBottom: 20,
            marginVertical: 10,
          }}
          keyboardShouldPersistTaps="always"
          data={popularChannels}
          keyExtractor={(item) => item.ID}
          renderItem={PopularChannelView}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ImageHeaderScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    playerState: state.playerState,
  };
};
export default connect(mapStateToProps, {
  getSongs,
  setPlayerState,
  setSelectedSong,
})(Home);

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
