import React from 'react';
import { AppRegistry } from 'react-native';
import Navigation from './src/navigation';

const App = () => (
    <Navigation />
);

AppRegistry.registerComponent('contacts', () => App);
