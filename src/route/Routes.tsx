import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import Splash from '../screens/splash/Splash';
import React from 'react';
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DailyForcast from '../screens/forcast/DailyForcast';
import TodayForcast from '../screens/forcast/TodayForcast';
import SavedLocation from '../screens/saved_location/SavedLocation';

import Ionicons from 'react-native-ionicons';
import Search from '../screens/search/Search';
import SelectedCityWeatherForcast from '../screens/search/SelectedCityWeatherForcast';
import SeachButton from '../component/SearchButton';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Routes(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Drawer"
            component={Drawers}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function CustomDrawerContent({navigation}) {
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <DrawerContentScrollView>
      <ImageBackground
        style={{height: 250}}
        source={require('../../assets/BGImages/splash_screen.png')}
      />

      <View style={{padding: 10, borderTopWidth: 0, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => navigateToScreen('DailyForcast')}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/openWeatherIcons/calendar.png')}
              style={{height: 25, width: 25}}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 10,
                color: '#000000',
              }}>
              Daily Forcast
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToScreen('TodayForcast')}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/openWeatherIcons/timer.png')}
              style={{height: 20, width: 20}}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 10,
                color: '#000000',
              }}>
              Today Forcast
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToScreen('SavedLocation')}
          style={{paddingVertical: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/openWeatherIcons/star.png')}
              style={{height: 20, width: 20}}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 10,
                color: '#000000',
              }}>
              Saved Location
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function Drawers({navigation}) {
  
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
          color: '#333',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="TodayForcast"
        component={TodayForcast}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="SavedLocation"
        component={SavedLocation}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="DailyForcast"
        component={DailyForcast}
        options={{headerShown: false}}
      />
      {/* <Drawer.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      /> */}
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="SelectedCityForcast"
        component={SelectedCityWeatherForcast}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default Routes;
