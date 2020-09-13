import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  Animated,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, Header, Title} from 'native-base';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGTH} = Dimensions.get('screen');
const HEADER_EXPANDED_HEIGHT = SCREEN_HEIGTH * 0.4;
const HEADER_COLLAPSED_HEIGHT = 60;
import {connect} from 'react-redux';
import LikeComponent from '../../component/likeComponent';
import {updateLike} from '../../redux/actions';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: 5,
      scrollY: new Animated.Value(0),
      article: this.props.route.params.article,
      modaleLibrarie: false,
      librarie: [],
      modalMessage: false,
    };
    this.pressLike = this.pressLike.bind(this);
    this.back = this.back.bind(this);
    this.librarie = this.librarie.bind(this);
    this.contactVendeur = this.contactVendeur.bind(this);
  }

  componentDidMount() {}

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

  back() {
    //API GET ARTICLE + STORE
    this.props.navigation.goBack();
  }

  librarie(article) {
    let librarie = [];
    for (let i = 0; i < article.librarie.length; i++) {
      librarie.push({url: article.librarie[i], props: {}});
    }

    this.setState({
      librarie: librarie,
      modaleLibrarie: true,
    });
  }

  contactVendeur() {
    this.setState({
      modalMessage: true,
    });
  }

  render() {
    let articleIndex = this.props.dataArticle.findIndex(
      (article) => article.id === this.state.article.id,
    );

    let article;

    if (this.props.dataArticle[articleIndex] !== undefined) {
      article = this.props.dataArticle[articleIndex];
    } else {
      article = this.state.article;
    }

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const heroTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <Animated.View
          style={{
            height: headerHeight,
            width: SCREEN_WIDTH,
            zIndex: 10,
            backgroundColor: '#FFF',
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
          <Animated.View style={{opacity: headerTitleOpacity}}>
            <Header style={styles.header}>
              <TouchableOpacity
                onPress={this.back}
                style={{
                  zIndex: 100,
                  width: '20%',
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                  justifyContent: 'center',
                }}>
                <Icon size={30} name="angle-left" />
              </TouchableOpacity>
              <View
                style={{
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Title style={{color: '#333', fontSize: 18}}>
                  Article <Text style={{fontSize: 14}}>(30€)</Text>
                </Title>
              </View>
            </Header>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              resizeMode: 'cover',
              height: headerHeight,
              width: SCREEN_WIDTH,
              opacity: heroTitleOpacity,
            }}>
            <TouchableOpacity
              onPress={this.back}
              style={{
                width: 60,
                height: 50,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                top: 3,
                left: -4,
                zIndex: 100,
              }}>
              <Icon style={{color: '#FFF'}} size={30} name="angle-left" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.librarie(article)}>
              <Image
                source={require('../../assets/images/shoes.jpg')}
                style={styles.imgBackground}
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.state.scrollY,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: '60%'}}>
              <Text
                style={{
                  color: '#333',
                  fontWeight: 'bold',
                }}>
                {article.name}
              </Text>
            </View>
            <View
              style={{
                width: '40%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 15,
              }}>
              <TouchableOpacity onPress={() => this.pressLike(article.id)}>
                <LikeComponent article={article} size={20} />
              </TouchableOpacity>
              <View>
                <Text style={{color: '#333', fontSize: 13, marginLeft: 5}}>
                  {article.like.length}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{color: '#333', fontSize: 13}}>{article.prix}€</Text>
          </View>
          <View style={{paddingTop: 10}}>
            <Text>{article.description}</Text>
          </View>

          <View style={{paddingHorizontal: 30, paddingVertical: 30}}>
            <TouchableOpacity
              onPress={() => this.contactVendeur(article)}
              style={{
                backgroundColor: '#E03378',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 30,
                alignItems: 'center',
              }}>
              <Text style={{color: '#FFF', fontSize: 15, fontWeight: 'bold'}}>
                Contacter vendeur
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal style={{margin:0}}
          isVisible={this.state.modaleLibrarie}
          transparent={true}
          onBackButtonPress={() =>
            this.setState({modaleLibrarie: false})
          }>
          <ImageViewer imageUrls={this.state.librarie} />
        </Modal>

        <Modal
          style={{justifyContent: 'flex-end', margin: 0}}
          isVisible={this.state.modalMessage}
          transparent={true}
          onBackButtonPress={() => this.setState({modalMessage: false})}>
          <View
            style={{
              backgroundColor: '#FFF',
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                paddingTop: 10,
              }}>
              <Text>Sélectionnez un message ou écrivez le vôtre.</Text>
              <View style={{alignItems: 'center', marginTop: 15}}>
                <TouchableOpacity style={styles.btnChoix}>
                  <Text style={{color: '#0366d6'}}>
                    Cet article est-il toujours disponible ?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center', marginTop: 10}}>
                <TouchableOpacity style={styles.btnChoix}>
                  <Text style={{color: '#0366d6'}}>
                    Cet article m'intéresse.
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center', marginTop: 10}}>
                <TouchableOpacity style={styles.btnChoix}>
                  <Text style={{color: '#0366d6'}}>
                    Dans quel état est cet article
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderTopColor: '#ddd',
                borderTopWidth: 1,
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <View style={{width: '75%', paddingHorizontal: 10}}>
                <TextInput
                  style={{
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderRadius: 30,
                    height: 45,
                    paddingHorizontal: 10,
                  }}
                  placeholder="Ecrire votre message ..."
                />
              </View>
              <View style={{width: '25%', paddingRight: 10}}>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#0366d6',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#FFF'}}>Envoyer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {session, dataArticle} = state.stateStore;
  return {session, dataArticle};
};

export default connect(mapStateToProps, {updateLike})(Details);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#FFF',
    width: '100%',
  },
  scrollContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    paddingTop: HEADER_EXPANDED_HEIGHT + 15,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  btnChoix: {
    borderWidth: 1,
    borderColor: '#0366d6',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
