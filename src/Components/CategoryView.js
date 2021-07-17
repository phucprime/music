import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const CategoryView = ({item}) => {
  const onPress = () => {
    alert('List Item Pressed');
  };

  const renderView = () => (
    <View style={{marginRight: 10}}>
      <Image
        style={{height: 66, width: 119, borderRadius: 10}}
        source={item.IMAGE}
        resizeMode={'stretch'}
      />
      <Text style={{marginLeft: 5, fontSize: 12, marginTop: 5}}>
        {item.NAME}
      </Text>
    </View>
  );

  return <TouchableOpacity onPress={onPress}>{renderView()}</TouchableOpacity>;
};

export default CategoryView;
