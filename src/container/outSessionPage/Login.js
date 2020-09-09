import React, {Component} from 'react';
import {View, Text, SafeAreaView, Dimensions} from 'react-native';
import {Container, Content} from 'native-base';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi, Kohana, Hideo} from 'react-native-textinput-effects';

class Login extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View>
            <View
              style={{
                height: windowHeight / 3,
              }}>
              <View
                style={{
                  height: '25%',
                  backgroundColor: '#82E0AA',
                }}
              />
              <View
                style={{
                  height: '25%',
                  backgroundColor: '#EE665A',
                }}
              />
              <View
                style={{
                  height: '25%',
                  backgroundColor: '#7D3C98',
                }}
              />
              <View
                style={{
                  height: '25%',
                  backgroundColor: '#2471A3',
                }}
              />
            </View>

            <View>
              <Kohana
                style={{backgroundColor: '#f9f5ed'}}
                label={'Line'}
                iconClass={FontAwesomeIcon}
                iconName={'university'}
                iconColor={'#f4d29a'}
                inputPadding={16}
                labelStyle={{color: '#91627b'}}
                inputStyle={{color: '#91627b'}}
                useNativeDriver
              />

              <Hideo
                iconClass={FontAwesomeIcon}
                iconName={'envelope'}
                iconColor={'#2471A3'}
                // this is used as backgroundColor of icon container view.
                iconBackgroundColor={'#FFF'}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Login;
