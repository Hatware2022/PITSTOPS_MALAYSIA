import React, { useState } from 'react';
import { Text, View, SafeAreaView, Alert } from 'react-native';
import Header from 'components/Header/Header';
import HeaderTitle from 'components/Header/HeaderTitle';
import HeaderSearch from 'components/Header/HeaderSearch';

function Saved() {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Header left={<HeaderTitle title="SAVED" />} right={<HeaderSearch />} />
            <View style={{ flex: 1 }}>

            </View>
        </SafeAreaView >
    );
};



export default Saved;