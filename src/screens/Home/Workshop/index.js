import React from 'react'
import { View } from 'react-native'
import { Styles } from 'themes'
import Spacer from 'components/Spacer'
import Navbar from 'components/Navbar'
import List from './List'

export default function ({ navigation }) {
    return (
        <View style={Styles.flex}>
            <View style={[Styles.container, Styles.col]}>
                <Navbar
                    title="WORKSHOP"
                    navigation={navigation} />
                <Spacer size="xs" />
                <List navigation={navigation} />
            </View>
        </View>
    )
}

