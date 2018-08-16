import React, { Component } from 'react';
import { FlatList, Image, PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native';
import Contacts from 'react-native-contacts';
import { includes, filter, reject, orderBy } from 'lodash';

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
      .then((granted) => {
        if (granted) {
          Contacts.getAll((err, contacts) => {
            if (err) throw err;

            let sorted = reject(contacts, function (item) { return item.phoneNumbers.length === 0; });
            sorted = reject(sorted, function (item) { return item.phoneNumbers[0].number.length < 6; });
            sorted.map((item, index) => {
              const meti = item;
              meti.name = '';
              if (item.givenName !== null) { meti.name = `${item.givenName}`; }
              if (item.name.length > 0 && item.middleName !== null) { meti.name = `${meti.name} `; }
              if (item.middleName !== null) { meti.name = `${meti.name}${item.middleName}`; }
              if (item.name.length > 0 && item.familyName !== null) { meti.name = `${meti.name} `; }
              if (item.familyName !== null) { meti.name = `${meti.name}${item.familyName}`; }
              sorted[index] = meti;
            });
            sorted = orderBy(sorted, user => user.name.toLowerCase());
            this.setState({ contacts: sorted });
          });
        }
      });
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
      return (granted);
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.contacts}
        renderItem={({ item }) =>
          <View>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Details', { contact: item }); }}>
              <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                <View style={{ width: 50, paddingLeft: 25 }}>
                  <Image
                    source={item.hasThumbnail ? ({ uri: item.thumbnailPath }) : (!item.company) ? Images.default : Images.company}
                    style={{ height: 40, width: 40, borderRadius: 4 }}
                  />
                </View>
                <Text style={{ fontSize: 16, width: 300, paddingLeft: 30 }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={14}
        disableVirtualization={false}
        ItemSeparatorComponent={() => <View style={{ backgroundColor: '#f3f3f3', height: 1 }} />}
      />
    );
  }
}

export default ConstactList;
