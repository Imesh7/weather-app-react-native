import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurrentLocationWeather} from '../../models/CurrentLocationWeather';
import FetchCurrentLocationWeather from './api/FetchCurrentLoactionWeather';
import AvatarImage from '../../utils/AvatarImage';
import Geolocation from 'react-native-geolocation-service';
import {AppBar} from '@react-native-material/core';
import SeachButton from '../../component/SearchButton';

const defaultImage = require('../../../assets/openWeatherIcons/01n.png');

function Home({navigation}): JSX.Element {
  const [weatherData, setWeatherData] = useState<CurrentLocationWeather | null>(
    null,
  );

  async function askPermissionAndFecth() {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (result) {
      await Geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        console.log('current location ' + latitude + ' ' + longitude);
        FetchCurrentLocationWeather({
          lat: latitude,
          lon: longitude,
        }).then(res => {
          setWeatherData(res);
        });
      });
    }
  }

  useEffect(() => {
    askPermissionAndFecth().catch(console.error);
  }, []);

  return (
    <SafeAreaView>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {weatherData && weatherData?.weather !== null ? (
          <WeatherBackGroundImage
            currentLocationWeather={weatherData}
            navigation={navigation}
          />
        ) : (
          <Text style={{paddingTop: 150, fontSize: 50}}>
            Data not Loaded........
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

function WeatherBackGroundImage({currentLocationWeather, navigation}) {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  if (
    (currentLocationWeather && currentLocationWeather?.weather !== undefined) ||
    null
  ) {
    console.log('fetch data' + currentLocationWeather?.name);
    const date = new Date(currentLocationWeather.dt * 1000);
    return (
      <View>
        <AppBar
          color="rgba(52, 52, 52, 0.8)"
          elevation={0}
          leading={
            <TouchableOpacity onPress={openDrawer}>
              <Image
                style={{height: 30, width: 30, marginLeft: 10}}
                source={require('../../../assets/openWeatherIcons/sidebaropen.png')}
              />
            </TouchableOpacity>
          }
          trailing={<SeachButton navigate={() => navigateToScreen('Search')} />}
        />
        <ImageBackground
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
          }}
          source={setBackGroundImage(currentLocationWeather?.dt)}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                }}
                source={require('../../../assets/openWeatherIcons/location-pin.png')}
              />
              <Text
                style={{
                  margin: 10,
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 25,
                  textShadowColor: 'rgba(0, 0, 0, 0.30)',
                  textShadowOffset: {width: -0.5, height: 1},
                  textShadowRadius: 2,
                }}>
                {currentLocationWeather?.name}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
              }}>
              <Text>{date.toLocaleString('en-US', {weekday: 'long'})}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  margin: 10,
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 60,
                  textShadowColor: 'rgba(0, 0, 0, 0.40)',
                  textShadowOffset: {width: -0.5, height: 1},
                  textShadowRadius: 2,
                }}>
                {currentLocationWeather.main.temp}
              </Text>
              <Image
                source={AvatarImage(currentLocationWeather.weather[0].icon)}
                style={{height: 50, width: 50}}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  margin: 10,
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 25,
                  textShadowColor: 'rgba(0, 0, 0, 0.30)',
                  textShadowOffset: {width: -0.5, height: 1},
                  textShadowRadius: 2,
                }}>
                {currentLocationWeather.weather[0].description}
              </Text>
            </View>
            <View style={{padding: 10}}>
              <ThreeRowCard props={currentLocationWeather} />
              <FlatList
                scrollEnabled={true}
                data={[{}, {}, {}]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <ThreeRowCardTwo props={currentLocationWeather} />
                )}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    console.log('started data null');
    return <></>;
  }
}

function ThreeRowCard({props}): JSX.Element {
  return (
    <View style={styles.card}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{height: 25, width: 25}}
          source={require('../../../assets/openWeatherIcons/img.png')}
        />
        <Text style={styles.cardDescription}>Max Temp</Text>
        <Text style={styles.cardTitle}>28.6 c</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{height: 25, width: 25}}
          source={require('../../../assets/openWeatherIcons/humidity.png')}
        />
        <Text style={styles.cardDescription}>Humidity</Text>
        <Text style={styles.cardTitle}>28.6 c</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{height: 25, width: 25}}
          source={require('../../../assets/openWeatherIcons/wind.png')}
        />
        <Text style={styles.cardDescription}>Wind</Text>
        <Text style={styles.cardTitle}>28.6 c</Text>
      </View>
    </View>
  );
}

function ThreeRowCardTwo({props}): JSX.Element {
  return (
    <View style={styles.listCard}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.cardTitle}>28.6 c</Text>
        <Text style={styles.cardDescription}>Scattered Clouds</Text>
        <Image
          style={{height: 75, width: 75}}
          source={require('../../../assets/openWeatherIcons/03d.png')}
        />
        <Text style={styles.cardDescription}>Scattered Clouds</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.cardTitle}>28.6 c</Text>
        <Text style={styles.cardDescription}>Scattered Clouds</Text>
        <Image
          style={{height: 75, width: 75}}
          source={require('../../../assets/openWeatherIcons/03d.png')}
        />
        <Text style={styles.cardDescription}>28.6 c</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.cardTitle}>28.6 c</Text>
        <Text style={styles.cardDescription}>Scattered Clouds</Text>
        <Image
          style={{height: 75, width: 75}}
          source={require('../../../assets/openWeatherIcons/04d.png')}
        />
        <Text style={styles.cardDescription}>28.6 c</Text>
      </View>
    </View>
  );
}

function setBackGroundImage(date: number) {
  const newDate = new Date(date * 1000);
  console.log(newDate);
  switch (true) {
    case newDate.getUTCHours() < 18.0:
      return require('../../../assets/BGImages/1.jpg');

    default:
      return require('../../../assets/BGImages/3.jpg');
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 20,
  },
  listCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: Dimensions.get('window').width - 40,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  cardDescription: {
    fontSize: 12,
    color: '#555',
  },
});

export default Home;
