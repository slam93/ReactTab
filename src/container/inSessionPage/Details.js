import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, Header, Title} from 'native-base';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGTH} = Dimensions.get('screen');
const HEADER_EXPANDED_HEIGHT = SCREEN_HEIGTH * 0.4;
const HEADER_COLLAPSED_HEIGHT = 60;
import {connect} from 'react-redux';
import LikeComponent from '../../component/likeComponent';
import {updateLike} from '../../redux/actions';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: 5,
      scrollY: new Animated.Value(0),
      article: this.props.route.params.article,
    };
    this.pressLike = this.pressLike.bind(this);
  }

  componentDidMount() {}

  pressLike(id) {
    let articleIndex = this.props.dataArticle.findIndex(
      (article) => article.id === id,
    );

    console.log(articleIndex);

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

  render() {

    let articleIndex = this.props.dataArticle.findIndex(
      (article) => article.id === this.state.article.id,
    );

    let article;

    if (this.props.dataArticle[articleIndex] !== undefined) {
      article = this.props.dataArticle[articleIndex];
    }else{
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
      <View style={{flex: 1}}>
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
            <View>
              <Image
                source={require('../../assets/images/shoes.jpg')}
                style={styles.imgBackground}
              />
            </View>

            <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
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
                  }}>
                  <TouchableOpacity
                  style={{backgroundColor:"red"}}
                    onPress={() => this.pressLike(article.id)}>
                    <LikeComponent article={article} />
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={{backgroundColor:"red"}}
                    onPress={() => this.pressLike(article.id)}>
                    <Text style={{color: '#333', fontSize: 13, marginLeft: 5}}>
                      {article.like.length}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={{color: '#333', fontSize: 13}}>
                  {article.prix}€
                </Text>
              </View>
            </View>
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
            <TouchableOpacity
                  style={{backgroundColor:"red"}}
                    onPress={() => this.pressLike(article.id)}>
                    <LikeComponent article={article} />
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={{backgroundColor:"red"}}
                    onPress={() => this.pressLike(article.id)}>
                    <Text style={{color: '#333', fontSize: 13, marginLeft: 5}}>
                      {article.like.length}
                    </Text>
                  </TouchableOpacity>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra massa sollicitudin ante interdum euismod. Aliquam erat
            volutpat. Nulla imperdiet interdum nunc quis posuere. Cras eros
            ipsum, ultricies dignissim libero vitae, aliquam consequat enim.
            Aliquam sodales consectetur lacus, eget ullamcorper mauris
            condimentum vel. Aenean eget faucibus enim, eget elementum ligula.
            Praesent blandit velit ex, quis tincidunt augue aliquam nec. Nam nec
            cursus dolor. Nunc ac augue interdum magna volutpat ultrices non eu
            risus. Suspendisse porttitor nunc augue, at placerat risus porta
            vel. Vivamus neque ligula, maximus id erat a, iaculis sollicitudin
            turpis. Aliquam erat ipsum, feugiat eu arcu sit amet, bibendum
            sodales enim. Proin enim orci, malesuada ac vehicula a, pellentesque
            a est. Morbi et pulvinar neque, ac porttitor enim. Praesent ut
            convallis libero. Duis ultrices mauris auctor blandit malesuada. Sed
            ullamcorper quam sem. In tempus sem vitae eros facilisis, a
            hendrerit tellus commodo. Vestibulum a tincidunt magna. Fusce tempus
            accumsan tortor, at tempus quam placerat ultrices. Proin at nulla
            porttitor, consectetur enim quis, gravida velit. Sed lacinia arcu
            quis risus varius, ut pretium est commodo. Sed eleifend consectetur
            lectus, sit amet porta odio commodo ac. Vestibulum nisl lorem,
            aliquet non dolor eu, tempor dictum arcu. Nam vestibulum, orci sit
            amet cursus mattis, nibh purus lobortis orci, vel gravida enim lacus
            eget enim. Duis commodo interdum semper. Vestibulum posuere rutrum
            porttitor. Etiam cursus, nibh at mollis elementum, dolor quam
            condimentum neque, ac ullamcorper purus enim imperdiet ligula. Donec
            consectetur tempus elit at eleifend. Nam cursus accumsan imperdiet.
            Donec quis libero nunc. Aliquam erat volutpat. Curabitur venenatis
            ultricies orci id dapibus. Morbi et pulvinar neque, ac porttitor
            enim. Praesent ut convallis libero. Duis ultrices mauris auctor
            blandit malesuada. Sed ullamcorper quam sem. In tempus sem vitae
            eros facilisis, a hendrerit tellus commodo. Vestibulum a tincidunt
            magna. Fusce tempus accumsan tortor, at tempus quam placerat
            ultrices. Proin at nulla porttitor, consectetur enim quis, gravida
            velit. Sed lacinia arcu quis risus varius, ut pretium est commodo.
            Sed eleifend consectetur lectus, sit amet porta odio commodo ac.
            Vestibulum nisl lorem, aliquet non dolor eu, tempor dictum arcu. Nam
            vestibulum, orci sit amet cursus mattis, nibh purus lobortis orci,
            vel gravida enim lacus eget enim. Duis commodo interdum semper.
            Vestibulum posuere rutrum porttitor. Etiam cursus, nibh at mollis
            elementum, dolor quam condimentum neque, ac ullamcorper purus enim
            imperdiet ligula. Donec consectetur tempus elit at eleifend. Nam
            cursus accumsan imperdiet. Donec quis libero nunc. Aliquam erat
            volutpat. Curabitur venenatis ultricies orci id dapibus.
          </Text>
        </ScrollView>
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
    paddingTop: HEADER_EXPANDED_HEIGHT + 50,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
