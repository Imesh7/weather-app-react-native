import {AppBar} from '@react-native-material/core';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

function SavedLocation({navigation}) {
  const iconBack = () => {
    console.log('back');
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <AppBar
        title={'Saved Location'}
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center', // Center vertically
          alignItems: 'center',
        }}>
        <Text style={{color: '#000000', fontSize: 30}}>Saved Location</Text>
      </View>
    </View>
  );
}

export default SavedLocation;
