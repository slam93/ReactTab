import React, {Component} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class LikeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: 5,
    };
  }
  render() {
    return (
      <View>
        {this.props.article.like.find(
          (idLike) => idLike == this.state.idUser,
        ) == undefined ? (
          <Icon name="heart-o" size={this.props.size} color={'grey'} />
        ) : (
          <Icon name="heart" size={this.props.size} color={'#E03378'} />
        )}
      </View>
    );
  }
}

export default LikeComponent;
