import React, { Component } from 'react';
import { FlatList, Image, PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native';
import Contacts from 'react-native-contacts';

import Images from '../assets/Images'; 

class ConstactList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
        };
    }

    componentDidMount() {
        this.requestContactsPermission()
            .then(
                Contacts.getAll((err, contacts) => {
                    if (err) throw err;

                    this.setState({ contacts });
                })
            );
    }

    async requestContactsPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts Permission',
                    message: 'Contacts app needs access to your contacts ' +
                        'so you can view your awesome friends.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Contacts permission granted');
            } else {
                console.log('Contacts permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.contacts}
                renderItem={({ item }, index) =>
                    <View>
                        <TouchableOpacity onPress={() => console.log('pressed contact')}>
                            <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                                <View style={{ width: 50, paddingLeft: 25 }}>
                                    <Image
                                        source={item.hasThumbnail ? ({ uri: item.thumbnailPath }) : Images.default}
                                        style={{ height: 40, width: 40, borderRadius: 4 }}
                                    />
                                </View>
                                <Text style={{ fontSize: 16, width: 300, paddingLeft: 30 }}>
                                    {item.givenName} {item.familyName}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    }
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{ backgroundColor: '#f3f3f3', height: 1 }} />}
            />
        );
    }
}

export default ConstactList;
