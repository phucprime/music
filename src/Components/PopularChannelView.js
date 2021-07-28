import React from 'react';
import {
  View, 
  Image, 
  TouchableOpacity
} from 'react-native';

const PopularChannelView = ({item}) => {
  const onPress = () => {
    alert('List Item Pressed');
  };

  const renderView = () => (
    <View style={{marginRight: 10}}>
      <Image
        style={{width: 96, height: 96}}
        resizeMode={'stretch'}
        source={item.IMAGE}
      />
    </View>
  );

  return <TouchableOpacity onPress={onPress}>{renderView()}</TouchableOpacity>;
};

export default PopularChannelView;
