import React from 'react';
import { View, Text, FlatList, AppRegistry } from 'react-native';
import { Header, SearchBar, List, ListItem } from 'react-native-elements';

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
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
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

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
    };

    renderSearch = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
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

    render() {
        return (
            <View >
                <Header
                    centerComponent={{ text: 'Contacts', style: { color: '#fff' } }}
                />
                <View>
                    <List containerStyle={{marginTop: 0, marginBottom: 20, borderTopWidth: 0, borderBottomWidth: 0}}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                            <ListItem
                                roundAvatar
                                title={`${item.name.first} ${item.name.last}`}
                                avatar={{ uri: item.picture.thumbnail }}
                            />
                            )}
                            keyExtractor={item => item.email}
                            ListHeaderComponent={this.renderSearch}
                            ListFooterComponent={this.renderFooter}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        />
                    </List>
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('contacts', () => App);