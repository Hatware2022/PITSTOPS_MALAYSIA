import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from 'navigations/Routes';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';

export default Navigator = () => {

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NavigationContainer>
                    <Routes />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );

}