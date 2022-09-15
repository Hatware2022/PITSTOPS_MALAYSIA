import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Images from 'utils/Images';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Styles, Colors } from 'themes'

const DropDownTextInput = ({ text, placeholder, ...props }) => {
    return (
        <View style={styles.container}>
            {text != "" ?
                <Text style={styles.text}>{text}</Text>
                :
                <Text style={styles.placeholder}>{placeholder}</Text>
            }
            <Image source={Images.images.dropDownArrow} />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', marginTop: moderateScale(10), borderColor: 'lightgray', borderWidth: 1, padding: 15, borderRadius: 5
    },
    text: {
        width: '95%', fontSize: verticalScale(16), fontFamily: 'Lato-Light'
    },
    placeholder: {
        width: '95%', fontSize: verticalScale(16), fontFamily: 'Lato-Light', color: Colors.grey
    }
})

export default DropDownTextInput;


