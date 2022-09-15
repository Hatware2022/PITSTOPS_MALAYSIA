import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const HeaderTitle = ({ title }) => {
    return (
        <View style={styles.left} >
            <Text style={styles.HeadText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    left: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: (Platform.OS === 'ios') ? 15 : 15,
        paddingLeft: 23
        // width: '60%',

    },
    HeadText: {
        fontSize: (Platform.OS === 'ios') ? moderateScale(18) : moderateScale(20),
        fontFamily: 'Inter-ExtraBold',
        letterSpacing: 2,
        color: 'black',
    }
});
export default HeaderTitle;
