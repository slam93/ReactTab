import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
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
      stepArticle: 6,
      stepNews: 4,
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
    this.props.navigation.navigate('Details', {article: article});
  }

  renderListing(article) {
    return (
      <TouchableOpacity
        key={article.id}
        onPress={() => this.pressDetail(article)}
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
          <Text
            style={{
              color: '#333',
              fontSize: 12,
              fontFamily: 'Montserrat-Regular',
            }}>
            Rakoto
          </Text>
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
                  fontFamily: 'Montserrat-Regular',
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
              <TouchableOpacity onPress={() => this.pressLike(article.id)}>
                <LikeComponent article={article} size={17} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.pressLike(article.id)}>
                <Text style={{color: '#333', fontSize: 13, marginLeft: 5}}>
                  {article.like.length}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{color: '#333', fontSize: 12}}>{article.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderListingHorizontal(nbrStepHinit) {
    let news = this.props.dataNews;
    let dataNews = [];
    let nbrStepH = this.state.stepNews;
    for (let i = nbrStepHinit; i < nbrStepH + nbrStepHinit; i++) {
      dataNews.push(news[i]);
    }
    return (
      <View key={nbrStepHinit * 999} style={{width: '100%'}}>
        <FlatList
          data={dataNews}
          horizontal
          contentContainerStyle={{paddingHorizontal: 5}}
          showsHorizontalScrollIndicator={false}
          renderItem={this.horizontalItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  horizontalItem({item}) {
    if (item !== undefined) {
      return (
        <TouchableOpacity
          style={{
            width: 200,
            paddingHorizontal: 4,
            backgroundColor: '#E03378',
          }}>
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
                resizeMode: 'cover',
                borderRadius: 50,
                marginRight: 10,
              }}
              source={require('../../assets/images/user_default.jpg')}
            />
            <Text
              style={{
                color: '#333',
                fontSize: 10,
                fontFamily: 'Montserrat-Regular',
              }}>
              Rakoto
            </Text>
          </View>

          <View style={{backgroundColor: 'transparent'}}>
            <Image
              style={{
                width: '100%',
                height: 175,
                resizeMode: 'contain',
              }}
              source={require('../../assets/images/shoes.jpg')}
            />
          </View>
          <View style={{paddingVertical: 5, paddingLeft: 5}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    color: '#333',
                    fontSize: 12,
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  {item.prix}€
                </Text>
              </View>
            </View>
            <View>
              <Text style={{color: '#333', fontSize: 12}}>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View />;
    }
  }

  listing() {
    let view = [];
    let article = this.props.dataArticle;
    let nbrStep = this.state.stepArticle;
    let nbrStepHinit = 0;
    for (let i = 0; i < article.length; i++) {
      if (i % nbrStep === 0) {
        if (i !== 0) {
          view.push(this.renderListingHorizontal(nbrStepHinit));
          nbrStepHinit = nbrStepHinit + this.state.stepNews;
        }
        view.push(this.renderListing(article[i]));
      } else {
        view.push(this.renderListing(article[i]));
      }
    }
    return view;
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
            {this.listing()}
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {session, dataArticle, dataNews} = state.stateStore;
  return {session, dataArticle, dataNews};
};

export default connect(mapStateToProps, {updateLike})(Home);

const styles = StyleSheet.create({});
