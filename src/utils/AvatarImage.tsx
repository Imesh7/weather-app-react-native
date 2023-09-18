function AvatarImage(avatar: string): string {
  switch (avatar) {
    case '01d':
      return require('../../assets/openWeatherIcons/01d.png');
    case '01n':
      return require('../../assets/openWeatherIcons/01n.png');
    case '02d':
      return require('../../assets/openWeatherIcons/02d.png');
    case '02n':
      return require('../../assets/openWeatherIcons/02d.png');
    case '03d':
      return require('../../assets/openWeatherIcons/03d.png');
    case '03n':
      return require('../../assets/openWeatherIcons/03n.png');
    case '04d':
      return require('../../assets/openWeatherIcons/04d.png');
    case '04n':
      return require('../../assets/openWeatherIcons/04n.png');
    case '09d':
      return require('../../assets/openWeatherIcons/09d.png');
    case '09n':
      return require('../../assets/openWeatherIcons/09n.png');
    case '10d':
      return require('../../assets/openWeatherIcons/10d.png');
    case '10n':
      return require('../../assets/openWeatherIcons/10n.png');
    case '11d':
      return require('../../assets/openWeatherIcons/11d.png');
    case '11n':
      return require('../../assets/openWeatherIcons/11n.png');
    case '13d':
      return require('../../assets/openWeatherIcons/13d.png');
    case '13n':
      return require('../../assets/openWeatherIcons/13n.png');
    default:
      return require('../../assets/openWeatherIcons/01n.png');
  }
}

export default AvatarImage;
