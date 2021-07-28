import React from 'react';
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';

const RecentPlayedView = ({item}) => {
  const onPress = () => {
    alert('List Item Pressed');
  };

  const renderView = () => (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      <Image
        style={{height: 53, width: 59, borderRadius: 10}}
        source={item.IMAGE}
        resizeMode={'stretch'}
      />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 0.9,
            marginHorizontal: 10,
            marginTop: 5,
            marginBottom: 2,
            justifyContent: 'space-between',
          }}>
          <Text
            numberOfLines={1}
            style={{fontSize: 16, color: '#707070', fontWeight: 'bold'}}>
            {item.NAME}
          </Text>
          <Text numberOfLines={1} style={{fontSize: 12, color: '#707070'}}>
            {item.SUBTITLE}
          </Text>
          <View
            style={{
              borderBottomColor: '#707070',
              borderBottomWidth: 0.5,
              width: '90%',
            }}></View>
        </View>
        <TouchableOpacity
          style={{
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => alert('List Menu Pressed')}>
          <Image
            style={{height: 20, width: 5}}
            source={require('../../assets/icons/list_menu.png')}
            resizeMode={'stretch'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return <TouchableOpacity onPress={onPress}>{renderView()}</TouchableOpacity>;
};

export default RecentPlayedView;
