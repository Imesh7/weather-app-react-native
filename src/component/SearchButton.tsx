import {Image, TouchableOpacity} from 'react-native';

function SeachButton({navigate}): JSX.Element {
  return (
    <TouchableOpacity onPress={navigate}>
      <Image
        style={{height: 24, width: 24, marginRight: 20}}
        source={require('../../assets/openWeatherIcons/search.png')}
      />
    </TouchableOpacity>
  );
}

export default SeachButton;
