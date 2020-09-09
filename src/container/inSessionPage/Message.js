import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Container, Content} from 'native-base';

class Message extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View>
            <Text>Profil</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Message;
