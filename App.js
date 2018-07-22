import React from 'react';
import { View, Text, FlatList, AppRegistry } from 'react-native';
import { Header, SearchBar, List, ListItem } from 'react-native-elements';
import Expo from 'expo';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            searchKey: '',
        };
    }

    componentDidMount() {
        // this.makeRemoteRequest();
        this.getAllContacts();
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false });
            });
    };

    handleRefresh = () => {
        this.setState(
            {
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );

    };

    handleSearch = (key) => {
        this.setState({searchKey: key});
    }

    renderSearchBar = () => {
        return <SearchBar
            round
            lightTheme
            placeholder="Search through all contacts"
            onChangeText={(e) => {this.handleSearch(e)}}
        />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
    };

    getAllContacts = async () => {

        // Ask for permission to query contacts.
        const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
        if (permission.status !== 'granted') {
            // Permission was denied...
            return;
        }
        
        Expo.Contacts.getContactsAsync({
			fields: [
				Expo.Contacts.PHONE_NUMBERS,
				Expo.Contacts.EMAILS,
			],
			pageSize: 147,
			pageOffset: 0,
		}).then(async ({data}) => {
			this.setState({
				contacts: data
			});
		})
    }
    
    extractNumberFrom = (number) => {
        if ( number && number.number ) {
            return(
                JSON.parse(JSON.stringify(number.number))
            ) 
        }
        return;
    }

    render() {
        return (
            <View >
                <Header
                    centerComponent={{ text: 'Contacts', style: { color: '#fff' } }}
                />
                <View>
                    <List containerStyle={{marginTop: 0, marginBottom: 20, borderTopWidth: 0, borderBottomWidth: 0}}>
                        <FlatList
                            data={this.state.contacts}
                            renderItem={({ item }) => (
                            <ListItem
                                roundAvatar
                                title={`${item.name}`}
                                subtitle={this.extractNumberFrom(item.phoneNumbers[0])}
                            />
                            )}
                            keyExtractor={item => item.name}
                            ListHeaderComponent={this.renderSearchBar}
                            ListFooterComponent={this.renderFooter}
                        />
                    </List>
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('contacts', () => App);