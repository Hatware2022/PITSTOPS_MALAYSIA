import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Header = ({ left, center, right }) => {
    return (
        <View style={styles.headerContainer}>
            {left}
            {center}
            {right}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        position: 'absolute',
        marginTop: (Platform.OS === 'ios') ? 30 : 0,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    }
})

export default Header;