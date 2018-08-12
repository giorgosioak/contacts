import { createStackNavigator } from 'react-navigation';

import Contacts from './screens/Contacts';
import Details from './screens/Details';

export default createStackNavigator(
    {
        Contacts,
        Details,
    },
    {
        initialRouteName: 'Contacts',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,   //remove shadow on iOS
            },
            headerTintColor: '#434343',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);
