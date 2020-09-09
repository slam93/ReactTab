import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Container, Content} from 'native-base';

class CreateAccount extends Component {
  render() {
    return (
      <>
        <SafeAreaView>
          <Container>
            <Content>
              <View>
                <Text>CreateAccount</Text>
              </View>
            </Content>
          </Container>
        </SafeAreaView>
      </>
    );
  }
}

export default CreateAccount;
