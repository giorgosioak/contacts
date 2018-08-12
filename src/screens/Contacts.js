import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import ContactList from '../components/ContactList';

export default class Contacts extends Component {
    static navigationOptions = {
        title: 'Contacts'
    };
    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#fff"
                />
                <ContactList navigation={this.props.navigation} />
            </View>
        );
    }
}
