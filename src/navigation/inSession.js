import * as React from 'react';
import {Text, View, Dimensions, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {useSafeArea} from 'react-native-safe-area-context';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Home from '../container/inSessionPage/Home';
import Setting from '../container/inSessionPage/Setting';
import Message from '../container/inSessionPage/Message';

const Tab = createBottomTabNavigator();

const CustomBottomBar = (props) => {
  return (
    <View>
      <BottomTabBar {...props} style={{paddingBottom: 5, paddingTop: 5}} />
    </View>
  );
};

export default function App() {
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Tab.Navigator
        tabBar={(props) => <CustomBottomBar {...props} />}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Home') {
              return <Ionicons name={'home'} size={size} color={color} />;
            } else if (route.name === 'Setting') {
              return <Ionicons name={'gear'} size={size} color={color} />;
            } else if (route.name === 'Message') {
              return <Ionicons name={'envelope'} size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#61dafb',
          inactiveTintColor: '#2D4980',
          showLabel: false,
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Setting" component={Setting} />
        <Tab.Screen name="Message" component={Message} />
      </Tab.Navigator>
      {useSafeArea().bottom > 0 && (
        <View
          style={{
            height: useSafeArea().bottom - 5,
            backgroundColor: 'white',
          }}
        />
      )}
    </View>
  );
}
