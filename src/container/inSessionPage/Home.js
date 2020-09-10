import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ARTICLE from '../../component/article';
import styleContainer from '../../component/styleContainer';
import {connect} from 'react-redux';
import LikeComponent from '../../component/likeComponent';
import {updateLike} from '../../redux/actions';
import {View} from 'react-native-animatable';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: 5,
      data: ARTICLE,
    };
    this.pressLike = this.pressLike.bind(this);
    this.pressDetail = this.pressDetail.bind(this);
  }

  pressLike(id) {
    let articleIndex = this.props.dataArticle.findIndex(
      (article) => article.id === id,
    );

    if (this.props.dataArticle[articleIndex] !== undefined) {
      let likes = this.props.dataArticle[articleIndex].like;
      if (likes.find((like) => like === this.state.idUser) === undefined) {
        likes.push(this.state.idUser);
        this.props.updateLike(id, likes);
      } else {
        let value = likes.filter((p) => p !== this.state.idUser);
        this.props.updateLike(id, value);
      }
    }
  }

  pressDetail(article) {
    this.props.navigation.navigate('Details');
  }

  render() {
    return (
      <Container>
        <View>
          <ImageBackground
            source={require('../../assets/images/b.jpg')}
            style={{paddingVertical: 15}}>
            <View style={styleContainer.overlay} />
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '80%', justifyContent: 'center'}}>
                <Image
                  style={{
                    width: 200,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: '#FFF',
                  }}
                  source={require('../../assets/images/logo.jpg')}
                />
              </View>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 25,
                }}>
                <Icon name={'sliders'} color={'#FFF'} size={22} />
              </View>
            </View>
          </ImageBackground>
        </View>
        <Content>
          <View
            animation="fadeInUpBig"
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 4,
            }}>
            {this.props.dataArticle.map((article, index) => (
              <TouchableOpacity
                onPress={() => this.pressDetail(article)}
                key={index}
                style={{width: '50%', paddingHorizontal: 4, marginBottom: 20}}>
                <View
                  animation="fadeInRight"
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                  }}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      borderRadius: 50,
                      marginRight: 10,
                    }}
                    source={require('../../assets/images/user_default.jpg')}
                  />
                  <Text style={{color: '#333', fontSize: 12}}>Rakoto</Text>
                </View>

                <View>
                  <Image
                    style={{
                      width: '100%',
                      height: windowWidth * 0.5,
                      resizeMode: 'cover',
                    }}
                    source={require('../../assets/images/shoes.jpg')}
                  />
                </View>
                <View style={{paddingVertical: 5, paddingLeft: 5}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: '60%'}}>
                      <Text
                        style={{
                          color: '#333',
                          fontSize: 13,
                          fontWeight: 'bold',
                        }}>
                        {article.prix}€
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '40%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.pressLike(article.id)}>
                        <LikeComponent article={article} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.pressLike(article.id)}>
                        <Text
                          style={{color: '#333', fontSize: 13, marginLeft: 5}}>
                          {article.like.length}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text style={{color: '#333', fontSize: 12}}>
                      {article.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {session, dataArticle} = state.stateStore;
  return {session, dataArticle};
};

export default connect(mapStateToProps, {updateLike})(Home);

const styles = StyleSheet.create({});
