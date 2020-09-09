import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View>
            <Text>Home</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Home;
