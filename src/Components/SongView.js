import React from 'react';
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';

const SongView = ({item, isPlaying = false, onPlay = () => {}}) => {
  const renderView = () => (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={onPlay}>
        <Image
          style={{height: 32, width: 32, borderRadius: 10}}
          source={
            isPlaying
              ? require('../../assets/icons/playing_list.png')
              : require('../../assets/icons/play_list.png')
          }
          resizeMode={'stretch'}
        />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 10}}>
          <View
            style={{
              flex: 0.9,
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                color: '#707070',
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              {item.NAME}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text numberOfLines={1} style={{fontSize: 11, color: '#707070'}}>
                {item.SUBTITLE}
              </Text>
              <View
                style={{
                  height: 4,
                  width: 4,
                  borderRadius: 25,
                  backgroundColor: '#707070',
                  marginHorizontal: 5,
                }}
              />
              <Text numberOfLines={1} style={{fontSize: 11, color: '#707070'}}>
                {item.ARTIST}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => alert('List Item Menu')}>
            <Image
              style={{height: 20, width: 5}}
              source={require('../../assets/icons/list_menu.png')}
              resizeMode={'stretch'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#707070',
            borderBottomWidth: 0.5,
            marginLeft: '3.5%',
            width: '85%',
          }}
        />
      </View>
    </View>
  );

  return <TouchableOpacity onPress={onPlay}>{renderView()}</TouchableOpacity>;
};

export default SongView;
