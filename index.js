/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import inSession from './src/navigation/inSession';

AppRegistry.registerComponent(appName, () => App);
