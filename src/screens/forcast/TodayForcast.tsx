import {AppBar, IconButton} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FetchTodayForcast} from './api/FetchForcast';
import {CurrentLocationWeather, Sys} from '../../models/CurrentLocationWeather';

function TodayForcast({navigation}): JSX.Element {
  const [todayWeatherForcast, setTodayWeatherForcast] =
    useState<CurrentLocationWeather | null>(null);

  useEffect(() => {
    FetchTodayForcast().then(response => setTodayWeatherForcast(response));
  }, []);

  const iconBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <AppBar
        title={'Today Weather Forcast'}
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
      {todayWeatherForcast !== null && (
        <View style={{padding: 10}}>
          <TwoRowCard props={todayWeatherForcast!.sys} />
          <FlatList
            scrollEnabled={true}
            data={[{}, {}, {}]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <ThreeRowCard />}
          />
          <Text>{todayWeatherForcast?.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

function TwoRowCard({props}): JSX.Element {
  const sunRise = new Date(props.sunrise * 1000);
  const sunSet = new Date(props.sunset * 1000);
  console.log(sunRise);
  console.log(sunSet);
  const srHours = sunRise.getUTCHours();
  const srMinutes = sunRise.getUTCMinutes();
  const formattedTimeSr = `${srHours}:${srMinutes} A.M.`;

  const ssHours = sunSet.getUTCHours();
  const ssMinutes = sunSet.getUTCMinutes();
  const formattedTimeSs = `${ssHours}:${ssMinutes} P.M.`;

  return (
    <View style={styles.card}>
      <View>
        <Image
          style={{height: 100, width: 100}}
          source={require('../../../assets/openWeatherIcons/sunrise.png')}
        />
        <Text style={styles.cardTitle}>{formattedTimeSr}</Text>
      </View>
      <View>
        <Image
          style={{height: 100, width: 100}}
          source={require('../../../assets/openWeatherIcons/sunset.png')}
        />
        <Text style={styles.cardTitle}>{formattedTimeSs}</Text>
      </View>
    </View>
  );
}

function ThreeRowCard(): JSX.Element {
  return (
    <View style={styles.listCard}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.cardTitle}>28.6 c</Text>
        <Text style={styles.cardDescription}>Scattered Clouds</Text>
        <Image
          style={{height: 50, width: 50}}
          source={require('../../../assets/openWeatherIcons/03d.png')}
        />
        <Text style={styles.cardDescription}>09.30 a.m.</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.cardTitle}>28.6 c</Text>
        <Text style={styles.cardDescription}>Scattered Clouds</Text>
        <Image
          style={{height: 50, width: 50}}
          source={require('../../../assets/openWeatherIcons/03d.png')}
        />
        <Text style={styles.cardDescription}>10.30 a.m.</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.cardTitle}>28.6 c</Text>
        <Text style={styles.cardDescription}>Scattered Clouds</Text>
        <Image
          style={{height: 50, width: 50}}
          source={require('../../../assets/openWeatherIcons/04d.png')}
        />
        <Text style={styles.cardDescription}>11.30 a.m.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 5,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  cardDescription: {
    fontSize: 12,
    color: '#555',
  },
});

export default TodayForcast;
