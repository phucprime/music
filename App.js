import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Screens/Home';
import Songs from './src/Screens/Songs';
import Player from './src/Components/Player/index';
import reducers from './src/Services/redux/reducers';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(
  reducers, 
  {}, 
  applyMiddleware(ReduxThunk)
);

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <Player />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({route}) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => alert('Menu')}>
                  <Image
                    source={
                      route && route.params && route.params.isHeaderImageHidden
                        ? require('./assets/icons/menu_black.png')
                        : require('./assets/icons/menu_white.png')
                    }
                    style={{height: 15, width: 25, marginLeft: 10}}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => alert('Search')}>
                  <Image
                    source={
                      route && route.params && route.params.isHeaderImageHidden
                        ? require('./assets/icons/search_black.png')
                        : require('./assets/icons/search_white.png')
                    }
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 10,
                    }}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity>
              ),
              headerBackTitleVisible: false,
              headerTitle: false,
              headerTransparent: true,
              headerTintColor: '#fff',
            })}
          />
          <Stack.Screen
            name="Songs"
            component={Songs}
            options={({route, navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.pop()}>
                  <Image
                    source={
                      route && route.params && route.params.isHeaderImageHidden
                        ? require('./assets/icons/back_black.png')
                        : require('./assets/icons/back_white.png')
                    }
                    style={{height: 20, width: 13, marginLeft: 10}}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => alert('Search')}>
                  <Image
                    source={
                      route && route.params && route.params.isHeaderImageHidden
                        ? require('./assets/icons/search_black.png')
                        : require('./assets/icons/search_white.png')
                    }
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 10,
                    }}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity>
              ),
              headerBackTitleVisible: false,
              headerTitle: false,
              headerTransparent: true,
              headerTintColor: '#fff',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
