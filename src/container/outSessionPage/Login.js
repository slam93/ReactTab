import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Container, Content, Toast} from 'native-base';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {setToken} from '../../redux/actions';
import {connect} from 'react-redux';
import styleContainer from '../../component/styleContainer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.connexion = this.connexion.bind(this);
  }

  connexion() {
    if (this.state.email === '') {
      Toast.show({
        text: 'Email incorrect',
        textStyle: {textAlign: 'center'},
        position: 'bottom',
        style: {
          borderRadius: 30,
          marginBottom: 10,
          marginHorizontal: 30,
          opacity: 0.8,
        },
      });
    } else if (this.state.password === '') {
      Toast.show({
        text: 'Mot de passe incorrect',
        textStyle: {textAlign: 'center'},
        position: 'bottom',
        style: {
          borderRadius: 30,
          marginBottom: 10,
          marginHorizontal: 30,
          opacity: 0.8,
        },
      });
    } else {
      //API
      this.props.setToken('12');
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            source={require('../../assets/images/b.jpg')}
            style={{
              height: windowHeight - windowHeight * 0.037,
            }}>
            <View style={styleContainer.overlay} />
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  height: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: windowHeight * 0.45,
                    resizeMode: 'contain',
                    tintColor: '#FFF',
                  }}
                  source={require('../../assets/images/logo.jpg')}
                />
              </View>
              <View style={{height: '50%'}}>
                <Text
                  style={{
                    fontSize: 28,
                    color: '#FFF',
                    textAlign: 'center',
                    marginBottom: 30,
                  }}>
                  Connexion
                </Text>
                <View style={{paddingHorizontal: 30, marginBottom: 20}}>
                  <View style={{marginVertical: 10}}>
                    <FontAwesomeIcon
                      name="user"
                      size={22}
                      color="grey"
                      style={styles.icon}
                    />
                    <TextInput
                      value={this.state.email}
                      placeholder="Login"
                      style={styles.textInput}
                      onChangeText={(text) => this.setState({email: text})}
                    />
                  </View>
                  <View style={{marginVertical: 10}}>
                    <FontAwesomeIcon
                      name="lock"
                      size={22}
                      color="grey"
                      style={styles.icon}
                    />
                    <TextInput
                      value={this.state.password}
                      placeholder="Mot de passe"
                      style={styles.textInput}
                      onChangeText={(text) => this.setState({password: text})}
                    />
                  </View>
                </View>
                <Text
                  style={{color: '#FFF', textAlign: 'center', fontSize: 14}}>
                  Vous n'avez pas de compte ?
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#FFF',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    Inscrivez-vous
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{height: '20%'}}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={this.connexion}
                    style={{
                      backgroundColor: '#E03378',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 30,
                    }}>
                    <Text
                      style={{color: '#FFF', fontSize: 16, fontWeight: 'bold'}}>
                      Connexion
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {session} = state.stateStore;
  return {session};
};

export default connect(mapStateToProps, {setToken})(Login);

const styles = StyleSheet.create({
  icon: {position: 'absolute', zIndex: 10, top: 11, left: 20},
  textInput: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    height: 45,
    paddingLeft: 55,
    paddingRight: 30,
  },
});
