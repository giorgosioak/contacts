import React, { Component } from 'react';
import { Linking, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images } from '@assets';
import moment from 'moment';

export default class Details extends Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props);

    const contact = this.props.navigation.state.params.contact;
    this.state = {
      contact,
    };
  }

  getMonth(month) {
    const string = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return string[month - 1];
  }

  getTimeForBirthday(birthdayDate, birthdayMonth) {   
    const today = new Date();

    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    let year = todayYear;
    
    if ((birthdayMonth < todayMonth) || (birthdayMonth === todayMonth && birthdayDate < (todayDate - 1))) { year++; }
    
    return moment([year, birthdayMonth - 1, birthdayDate]).calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM'
  });
  }

  openMaps = (formattedAddress) => {
    const prefix = (Platform.OS === 'android') ? 'https://maps.google.com/' : 'comgooglemaps://';
    const url = `${prefix}?q=${formattedAddress}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
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

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            source={contact.hasThumbnail ? ({ uri: contact.thumbnailPath }) : (!contact.company) ? Images.default : Images.company}
            style={{ height: 100, width: 100, borderRadius: 10 }}
          />
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, color: 'black' }}>
            {contact.name}
          </Text>
        </View>
          
        {(contact.phoneNumbers.length > 0) ? (
          <Text style={{ fontSize: 12, paddingTop: 10 }}>PHONE: </Text>
        ) : (null)}
        {
          contact.phoneNumbers.map((item, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                <View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
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
              <View key={index} style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                <View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
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

        {(contact.postalAddresses.length > 0) ? (
          <Text style={{ fontSize: 12, paddingTop: 10 }}>ADDRESS: </Text>
        ) : (null)}
        {
          contact.postalAddresses.map((item, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                <View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
                  {(index === 0) ? (
                    <Icon name='map-marker' size={30} color='gray' />
                  ) : (null)}
                </View>
                <TouchableOpacity onPress={() => this.openMaps(item.formattedAddress)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                    <Text style={{ fontSize: 17, color: 'black' }}>{item.formattedAddress}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.label}</Text>
                  </View>
                  <Icon name='angle-right' size={30} color='gray' />
                </TouchableOpacity>
              </View>
            );
          })
        }
        {(contact.postalAddresses.length > 0) ? (
          <View style={{ backgroundColor: '#f3f3f3', height: 1 }} />
        ) : (null)}

        {(contact.birthday) ? (
          <View>
            <Text style={{ fontSize: 12, paddingTop: 10 }}>BIRTHDAY: </Text>
            <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
              <View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name='birthday-cake' size={30} color='gray' />
              </View>
              <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                <Text style={{ fontSize: 17, color: 'black' }}>{contact.birthday.day}, {this.getMonth(contact.birthday.month)}</Text>
                <Text style={{ fontSize: 14, color: 'gray' }}>{ this.getTimeForBirthday(contact.birthday.day, contact.birthday.month)}</Text>
              </View>
            </View>
          <View style={{ backgroundColor: '#f3f3f3', height: 1 }} />
        </View>
      ) : (null)}
      </ScrollView>
    );
  }
}
