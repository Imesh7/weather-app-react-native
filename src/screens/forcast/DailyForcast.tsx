import {AppBar} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DailyWeatherForcast} from '../../models/DailyWeatherForcast';
import {FetchDailyForcast} from './api/FetchForcast';
import AvatarImage from '../../utils/AvatarImage';

function DailyForcast({navigation}): JSX.Element {
  const [dailyWeatherForcast, setDailyWeatherForcast] =
    useState<DailyWeatherForcast | null>(null);

  useEffect(() => {
    FetchDailyForcast().then(response => setDailyWeatherForcast(response));
  }, []);

  const iconBack = () => {
    console.log('back');
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <AppBar
        title={'Daily Weather Forcast'}
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
      {dailyWeatherForcast !== null && (
        <FlatList
          scrollEnabled={true}
          data={dailyWeatherForcast?.list}
          renderItem={({item}) => <ThreeRowCard props={item} />}
        />
      )}
    </View>
  );
}

function ThreeRowCard({props}): JSX.Element {
  const date = new Date(props.dt_txt);
  const dateName = date
    .toLocaleDateString('en-US', {
      weekday: 'long',
    })
    .split(',')[0];

  const dateFormat = `${date.getUTCMonth()}/${date.getUTCDate()}`;

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{dateName}</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Image
            style={{height: 15, width: 15, margin: 5}}
            source={require('../../../assets/openWeatherIcons/calendar.png')}
          />
          <Text style={styles.cardDescription}>{dateFormat}</Text>
        </View>
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.cardTitle}>{props.main.temp}</Text>
          <Image
            style={{height: 25, width: 25, padding: 2, marginLeft: 5}}
            source={AvatarImage(props.weather[0].icon)}
          />
        </View>
        <Text style={styles.cardDescription}>
          {props.weather[0].description}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{height: 40, width: 40, padding: 5, margin: 5}}
          source={require('../../../assets/openWeatherIcons/img_1.png')}
        />
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.cardTitle}>Max : {props.main.temp_max}</Text>
          <Text style={styles.cardTitle}>Min : {props.main.temp_min}</Text>
        </View>
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
    marginVertical: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
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
    fontSize: 14,
    color: '#555',
  },
});

export default DailyForcast;
