import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Container, Content} from 'native-base';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi, Kohana, Hideo} from 'react-native-textinput-effects';

class Login extends Component {
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../../assets/images/b1.jpg')}
          style={{
            flex: 1,
          }}>
          <Text>sddd</Text>
        </ImageBackground>
      </Container>
    );
  }
}

export default Login;
