import React from 'react';
import { View, AppRegistry } from 'react-native';
import Header from './components/Header';
import ContactList from './components/ContactList';

const App = () => (
    <View>
        <Header title={'Contacts'} />
        <ContactList />
    </View>
);

AppRegistry.registerComponent('contacts', () => App);
