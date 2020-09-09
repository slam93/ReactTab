import React from 'react';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';

type Props = {
  iconName: string,
  isCurrent?: boolean,
};

export const BottomMenuItem = ({iconName, isCurrent}: Props) => {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons
        name={iconName}
        size={32}
        style={{color: isCurrent ? 'blue' : 'red'}}
      />
    </View>
  );
};
