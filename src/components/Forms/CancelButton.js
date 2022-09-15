import React from 'react';
import { View, Text, Stylesheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function CancelButton({ onPress, hasOpacity = false, disabled = false, containerStyles = {}, styles = {}, textStyles = {}, ...props }) {
    let Container = hasOpacity ? TouchableOpacity : TouchableWithoutFeedback

    return (
        <Container style={containerStyles ? { ...containerStyles } : { flex: 1 }} disabled={disabled} onPress={onPress}>
            <View style={{ padding: moderateScale(10), marginTop: moderateScale(5), marginBottom: moderateScale(5), borderRadius: 5, borderColor: '#00A19C', borderWidth: 1, ...styles }}>

                <Text style={{ textAlign: 'center', color: '#00A19C', fontFamily: 'Inter-Regular', fontSize: moderateScale(16), ...textStyles }}>{props.title}</Text>
            </View>
        </Container>
    )
};

export default CancelButton;


