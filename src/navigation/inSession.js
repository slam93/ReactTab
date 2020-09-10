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
import Details from '../container/inSessionPage/Details';
import CreateAccount from '../container/outSessionPage/CreateAccount';
import {createStackNavigator} from '@react-navigation/stack';
const Context = React.createContext();
const Tab = createBottomTabNavigator();

const CustomBottomBar = (props) => {
  return (
    <View>
      <BottomTabBar {...props} style={{paddingBottom: 5, paddingTop: 5}} />
    </View>
  );
};
const StackHome = createStackNavigator();

function homeStack({navigation, route}) {
  if (route.state !== undefined) {
    if (route.state.index === 0) {
      navigation.setOptions({tabBarVisible: true});
    } else {
      navigation.setOptions({tabBarVisible: false});
    }
  }

  return (
    <StackHome.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <StackHome.Screen name="Home" component={Home} />
      <StackHome.Screen name="Details" component={Details} />
    </StackHome.Navigator>
  );
}

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
          activeTintColor: '#E03378',
          inactiveTintColor: '#61dafb',
          showLabel: false,
        }}>
        <Tab.Screen name="Home" component={homeStack} />
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
