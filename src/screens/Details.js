import React, { Component } from 'react';
import { Image, Dimensions, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images } from '@assets';

export default class Details extends Component {
    static navigationOptions = {
        title: '',
    };

    constructor(props) {
        super(props);

        const contact = this.props.navigation.state.params.contact;

        contact.name = '';
        if (contact.givenName !== null) { contact.name = `${contact.givenName}`; }
        if (contact.name.length > 0 && contact.middleName !== null) { contact.name = `${contact.name} `; }
        if (contact.middleName !== null) { contact.name = `${contact.name}${contact.middleName}`; }
        if (contact.name.length > 0 && contact.familyName !== null) { contact.name = `${contact.name} `; }
        if (contact.familyName !== null) { contact.name = `${contact.name}${contact.familyName}`; }

        this.state = {
            contact,
        };
    }

    render() {
        const contact = this.state.contact;
        // const width = Dimensions.get('window').width; //full width
        return (
            <ScrollView style={{ backgroundColor: '#fff', paddingLeft: 15, paddingRight: 15 }}>

                {/* <View style={{ flexDirection: 'row', height: 100, alignItems: 'center' }}>
                    <Image
                        source={contact.hasThumbnail ? ({ uri: contact.thumbnailPath }) : null}
                        style={{ height: 90, width: 90, borderRadius: 6, alignSelf: 'center' }}
                    />
                    <View style={{ flexDirection: 'column', paddingLeft: 15 }}>
                        <Text style={{ fontSize: 17 }}>
                            {contact.givenName}
                        </Text>
                        <Text style={{ fontSize: 17 }}>
                            {contact.middleName}
                        </Text>
                        <Text style={{ fontSize: 17 }}>
                            {contact.familyName}
                        </Text>
                    </View>
                </View> */}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={contact.hasThumbnail ? ({ uri: contact.thumbnailPath }) : Images.default}
                        style={{ height: 40, width: 40, borderRadius: 4 }}
                    />
                    <Text style={{ fontSize: 24, color: 'black', paddingLeft: 15 }}>
                        {contact.name}
                    </Text>
                </View>

                {(contact.phoneNumbers.length > 0) ? (
                    <Text style={{ fontSize: 12, paddingTop: 10 }}>PHONE: </Text>
                ) : (null)}
                {
                    contact.phoneNumbers.map((item, index) => {
                        return (
                            <View key={item.id} style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                                <View style={{ width: 30 }}>
                                    {(index === 0) ? (
                                        <Icon name='phone' size={30} color='gray' />
                                    ) : (null)}
                                </View>
                                <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                                    <Text style={{ fontSize: 17, color: 'black' }}>{item.number}</Text>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.label}</Text>
                                </View>
                            </View>
                        );
                    })
                }
                {(contact.phoneNumbers.length > 0) ? (
                    <View style={{ backgroundColor: '#f3f3f3', height: 1 }} />
                ) : (null)}

                {(contact.emailAddresses.length > 0) ? (
                    <Text style={{ fontSize: 12, paddingTop: 10 }}>EMAIL: </Text>
                ) : (null)}
                {
                    contact.emailAddresses.map((item, index) => {
                        return (
                            <View key={item.id} style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                                <View style={{ width: 30 }}>
                                    {(index === 0) ? (
                                        <Icon name='envelope-o' size={30} color='gray' />
                                    ) : (null)}
                                </View>
                                <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                                    <Text style={{ fontSize: 17, color: 'black' }}>{item.email}</Text>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.label}</Text>
                                </View>
                            </View>
                        );
                    })
                }
                {(contact.emailAddresses.length > 0) ? (
                    <View style={{ backgroundColor: '#f3f3f3', height: 1 }} />
                ) : (null)}

                {/* <Text style={{ fontSize: 12 }}>
                    Birthday: {contact.birthday.day} / {contact.birthday.month}
                </Text>
                <View style={{ backgroundColor: '#f3f3f3', height: 1 }} /> */}

            </ScrollView>
        );
    }
}
