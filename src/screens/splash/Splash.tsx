import React, {useEffect} from 'react';
import {Image} from 'react-native';

function Splash({navigation}): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Drawer');
    }, 3000);
  }, [navigation]);

  return (
    <Image
      style={{flex: 1}}
      source={require('../../../assets/BGImages/splash_screen.png')}
    />
  );
}

export default Splash;
