import React, { useState } from 'react';
import { Text, View, SafeAreaView, Alert, Button } from 'react-native';

function Dashboard({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{ flex: 1 }}>
                <Text>Dashboard</Text>
                <Button title="Drawer" onPress={() => alert("todo!")} />
            </View>
        </SafeAreaView >
    );
};



export default Dashboard;