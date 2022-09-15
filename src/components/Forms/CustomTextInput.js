import React from 'react';
import { View, Text, Stylesheet, TextInput } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


function CustomTextInput({ children, value, onChange, ...props }) {
    return (
        <View style={{ padding: 5, borderColor: 'lightgray', borderWidth: 0.6, borderRadius: 5, marginTop: moderateScale(5), marginBottom: moderateScale(5) }}>
            <TextInput value={value} onChange={onChange} placeholder={props.placeholder} style={{ fontFamily: 'Inter-Regular', fontSize: moderateScale(13) }} />
        </View>
    )
};

export default CustomTextInput;


