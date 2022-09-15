import React from 'react';
import { View, Image, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as Images from 'utils/Images';

const HeaderMenu = ({ onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.right}>
                <Image style={{}} source={Images.images.headerMenu} />

            </View>
        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    right: {
        marginTop: (Platform.OS === 'ios') ? moderateScale(5) : 0,
        paddingTop: 20,
        marginRight: moderateScale(10),
    }
});

export default HeaderMenu;