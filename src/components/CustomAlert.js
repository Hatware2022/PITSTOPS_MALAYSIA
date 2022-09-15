import React, { useEffect, useState } from 'react'
import {
    Text,
    StyleSheet,
    Animated,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    BackHandler,
    Modal,
    Platform,
} from 'react-native';
import { Colors } from 'themes';

function Confirmation(props) {
    const { OS } = Platform;
    const { show, modalProps = {}, closeOnHardwareBackPress, onDismiss } = props
    const [showSelf, setShowSelf] = useState(false)
    const [springValue] = useState(new Animated.Value(props.animatedValue))
    // const wrapInModal = OS === 'android' || OS === 'ios'

    useEffect(() => {
        if (show) {
            _springShow(true)
        } else {
            _springHide()
        }
    }, [show])

    _toggleAlert = (fromConstructor) => {
        if (fromConstructor) setShowSelf(true);
        else setShowSelf(!showSelf)
    };

    _onDismiss = () => {
        onDismiss && onDismiss();
    };

    _springShow = (fromConstructor) => {
        const { useNativeDriver = false } = props;

        _toggleAlert(fromConstructor)
        Animated.spring(springValue, {
            toValue: 1,
            bounciness: 10,
            useNativeDriver,
        }).start();
    };

    _springHide = () => {
        const { useNativeDriver = false } = props;

        if (showSelf === true) {
            Animated.spring(springValue, {
                toValue: 0,
                tension: 10,
                useNativeDriver,
            }).start();

            setTimeout(() => {
                _toggleAlert();
                _onDismiss();
            }, 70);
        }
    };

    _onTapOutside = () => {
        const { closeOnTouchOutside } = props;
        if (closeOnTouchOutside) _springHide();
    };

    _renderButton = (data) => {
        const {
            testID,
            text,
            backgroundColor,
            buttonStyle,
            buttonTextStyle,
            onPress,
        } = data;

        return (
            <TouchableOpacity testID={testID} onPress={onPress}>
                <View style={[styles.button, { backgroundColor }, buttonStyle]}>
                    <Text style={[testID == 'cancel' ? styles.buttonTextCancel : styles.buttonText, buttonTextStyle]}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    _renderAlert = () => {
        const animation = { transform: [{ scale: springValue }] };
        const { showProgress } = props;
        const { title, message, customView = null } = props;

        const {
            showCancelButton,
            cancelText,
            cancelButtonColor,
            cancelButtonStyle,
            cancelButtonTextStyle,
            onCancelPressed,
            cancelButtonTestID,
            animate
        } = props;

        const {
            showConfirmButton,
            confirmText,
            confirmButtonColor,
            confirmButtonStyle,
            confirmButtonTextStyle,
            onConfirmPressed,
            confirmButtonTestID
        } = props;

        const {
            alertContainerStyle,
            overlayStyle,
            progressSize,
            progressColor,
            contentContainerStyle,
            contentStyle,
            titleStyle,
            messageStyle,
            actionContainerStyle,
        } = props;

        const cancelButtonData = {
            testID: cancelButtonTestID,
            text: cancelText,
            backgroundColor: cancelButtonColor,
            buttonStyle: cancelButtonStyle,
            buttonTextStyle: cancelButtonTextStyle,
            onPress: onCancelPressed,
        };

        const confirmButtonData = {
            testID: confirmButtonTestID,
            text: confirmText,
            backgroundColor: confirmButtonColor,
            buttonStyle: confirmButtonStyle,
            buttonTextStyle: confirmButtonTextStyle,
            onPress: onConfirmPressed,
        };

        return (
            <View style={[styles.container, alertContainerStyle]}>
                <TouchableWithoutFeedback onPress={_onTapOutside}>
                    <View style={[styles.overlay, overlayStyle]} />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={[styles.contentContainer, animate ? animation : false, contentContainerStyle]}
                >
                    <View style={[styles.content, contentStyle]}>
                        {showProgress ? (
                            <ActivityIndicator size={progressSize} color={progressColor} />
                        ) : null}
                        {title ? (
                            <Text style={[styles.title, titleStyle]}>{title}</Text>
                        ) : null}
                        {message ? (
                            <Text style={[styles.message, messageStyle]}>{message}</Text>
                        ) : null}
                        {customView}
                    </View>
                    {!customView ?
                        <View style={[styles.action, actionContainerStyle]}>
                            {showConfirmButton ? _renderButton(confirmButtonData) : null}
                            {showCancelButton ? _renderButton(cancelButtonData) : null}
                        </View> : <View />}
                </Animated.View>
            </View>
        );
    }

    return <Modal
        animationType="none"
        transparent={true}
        visible={show}
        onRequestClose={() => {
            if (showSelf && closeOnHardwareBackPress) {
                _springHide();
            }
        }}
        {...modalProps}
    >
        {_renderAlert()}
    </Modal>
}

export default Confirmation

Confirmation.defaultProps = {
    show: false,
    animate: false,
    animatedValue: 0.3,
    useNativeDriver: false,
    showProgress: false,
    closeOnTouchOutside: true,
    closeOnHardwareBackPress: true,
    showCancelButton: false,
    showConfirmButton: false,
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    cancelButtonColor: Colors.white,
    confirmButtonColor: Colors.primary,
    customView: null,
    modalProps: {},
    cancelButtonTestID: 'cancel',
    confirmButtonTestID: 'confirm'
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    overlay: {
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: 'rgba(52,52,52,0.5)'
    },
    contentContainer: {
        maxWidth: '80%',
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10
    },
    content: {},
    action: {
        flexDirection: 'column',
        marginTop: 30
    },
    title: {
        paddingVertical: 5,
        color: Colors.secondary,
        fontSize: 18,
        fontWeight: '500'
    },
    message: {
        paddingTop: 5,
        color: Colors.tertiery,
        fontSize: 14
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        margin: 5,
        borderRadius: 5,
        borderColor: Colors.primary,
        borderWidth: 1
    },
    buttonText: {
        color: Colors.white,
        fontSize: 14,
        textAlign: 'center'
    },
    buttonTextCancel: {
        color: Colors.primary,
        fontSize: 14,
        textAlign: 'center'
    }
});