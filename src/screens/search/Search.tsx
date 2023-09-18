import {AppBar, TextInput} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FetchSearchData, {FetchSearchLocations} from './api/FetchSearchData';
import {SearchLocation} from '../../models/SearchLocation';

function Search({navigation}): JSX.Element {
  const iconBack = () => {
    console.log('back');
    navigation.goBack();
  };

  const pushToSelectedLoactionWeather = (props: SearchLocation) => {
    navigation.navigate('SelectedCityForcast', {
      lat: props.lat,
      lon: props.lon,
    });
  };

  const handleSearch = () => {};

  const [input, setInput] = useState('');
  const [searchLocation, setSearchLocation] = useState<[SearchLocation]>();

  const onChangeText = text => {
    setInput(text);
    //text length should be more than 1
    if (text.length > 1) {
      FetchSearchLocations(text).then(result => setSearchLocation(result));
    }
  };

  useEffect(() => {
    //FetchSearchData().then(e => setSearchText(e));
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppBar
        title={'Search City'}
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
      <View style={{flex: 1}}>
        <ImageBackground
          style={{height: '100%'}}
          source={require('../../../assets/BGImages/searchCity.jpg')}>
          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="City Name"
              onChangeText={text => onChangeText(text)}
              value={input}
              underlineColorAndroid="transparent"
              leading={props => (
                <Image
                  style={{height: 20, width: 20, marginRight: 5}}
                  source={require('../../../assets/openWeatherIcons/search.png')}
                />
              )}
            />

            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  alignItems: 'center',
                }}
                source={require('../../../assets/openWeatherIcons/search.png')}
              />
            </TouchableOpacity>
          </View>
          <View>
            {input && searchLocation?.length > 1 ? (
              <FlatList
                data={searchLocation}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <Pressable
                    style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
                    onPress={() => {
                      pushToSelectedLoactionWeather(item);
                    }}>
                    {getItemText(item)}
                  </Pressable>
                )}
                keyExtractor={(item, index) => item.name + index}
              />
            ) : null}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const getItemText = (item: SearchLocation) => {
  let mainText = item.name;
  if (item.name === 'city' && item.state) {
    mainText += ', ' + item.state;
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
      <View style={{marginLeft: 10, flexShrink: 1}}>
        <Text style={{fontWeight: '700'}}>{mainText}</Text>
        <Text style={{fontSize: 12}}>{item.country}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {flexDirection: 'row', padding: 20},
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#ffffff',
    borderRadius: 5,
    borderBottomWidth: 0,
  },
  button: {
    height: '90%',
    backgroundColor: '#344ac2', // Customize button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    alignContent: 'center',
  },
});

export default Search;
function setSearchText(e: any) {
  throw new Error('Function not implemented.');
}
