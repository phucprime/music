import React from 'react';
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';

const ArtistView = ({item}) => {
  const onPress = () => {
    alert('List Item Pressed');
  };

  const renderView = () => (
    <View style={{marginRight: 10}}>
      <Image
        style={{width: 147, height: 170}}
        resizeMode={'stretch'}
        source={item.IMAGE}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.40)',
          shadowColor: 'black',
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.8,
        }}>
        <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
          <View style={{flex: 0.8}}>
            <Text
              style={{color: 'white', fontStyle: 'italic', fontWeight: '700'}}>
              {item.FIRST_NAME}
            </Text>
            <Text
              style={{color: 'white', fontStyle: 'italic', fontWeight: '700'}}>
              {item.LAST_NAME}
            </Text>
          </View>
          <View
            style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: 20, height: 24}}
              source={require('../../assets/icons/play_white.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return <TouchableOpacity onPress={onPress}>{renderView()}</TouchableOpacity>;
};

export default ArtistView;
