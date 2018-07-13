import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

class ConstactList extends Component {

    state = { contacts: [] };

    componentWillMount() {
        axios.get('http://jsonplaceholder.typicode.com/users').then(response => this.setState({ contacts: response.data }));
    }

    renderContacts() {
        this.state.contacts.map(contact =>
            <Text key={contact.id}>{contact.name} {contact.phone}</Text>
        );
    }

    render() {
        return (
            <View>
                {this.renderContacts()}
            </View>
        );
    }
}

export default ConstactList;
