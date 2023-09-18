import {AppBar} from '@react-native-material/core';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurrentLocationWeather} from '../../models/CurrentLocationWeather';
import {FetchSelectedLocationWeather} from './api/FetchSearchData';

function SelectedCityWeatherForcast({navigation, route}): JSX.Element {
  const iconBack = () => {
    navigation.goBack();
  };

  const {lat, lon} = route.params;
  const [selectedLocationWeather, setSelectedLocationWeather] =
    useState<CurrentLocationWeather | null>();

  useEffect(() => {
    FetchSelectedLocationWeather({lat, lon}).then(response =>
      setSelectedLocationWeather(response),
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppBar
        title={'Selected City Weather Detail'}
        color="#FFFFFF"
        elevation={0}
        leading={
          <TouchableOpacity onPress={iconBack}>
            <Image
              style={{height: 30, width: 30, marginLeft: 5}}
              source={require('../../../assets/openWeatherIcons/back.png')}
            />
          </TouchableOpacity>
        }
      />
      <View style={{flex: 1, backgroundColor: '#61c77d'}}>
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
            {selectedLocationWeather?.name}
          </Text>
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
            {selectedLocationWeather?.main.temp}
          </Text>
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
            {selectedLocationWeather?.weather[0].description}
          </Text>
        </View>
        <View style={{padding: 10}}>
          <ThreeRowCard props={selectedLocationWeather} />
        </View>
      </View>
    </View>
  );
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

export default SelectedCityWeatherForcast;
