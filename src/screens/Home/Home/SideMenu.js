import React, { useState } from 'react';
import { Text, View, SafeAreaView, Alert, Image, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native';
import * as Images from 'utils/Images';
import { Styles, Colors } from 'themes';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import ChevronRightIcon from 'assets/icons/chevron-right.svg';
import SettingsIcon from 'assets/icons/settings.svg';
import InfoIcon from 'assets/icons/info-circle.svg';
import MessageIcon from 'assets/icons/message.svg';
import LogoutIcon from 'assets/icons/signout.svg';

function SideMenu({ modalVisible, goToProfile, ...props }) {
    const state = useSelector(state => state);
    console.log(state);



    return (

        <View style={{ flex: 1 }} >

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 10, height: moderateScale(350), width: '100%', alignSelf: 'flex-end', position: 'absolute', bottom: 0 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                            <Image source={Images.images.modalHeadBar} />
                        </View>
                        <TouchableOpacity onPress={props.onClose}>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={Images.images.darkClose} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, marginLeft: 40, marginTop: 20 }}>
                            <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                                <View style={{ width: 50, height: 50 }}>
                                    <Image source={Images.images.user} style={{ marginTop: 5, borderRadius: moderateScale(25), width: moderateScale(32), height: moderateScale(32) }} />
                                </View>
                                <TouchableOpacity onPress={goToProfile}>
                                    <View style={{ flex: 5, height: 50, flexDirection: 'row' }}>
                                        <View style={{ width: '89%', height: 30 }}>
                                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: moderateScale(16) }}>Hamzah Moktar</Text>
                                            <Text style={{ fontSize: moderateScale(12) }}>TA Manager</Text>
                                        </View>
                                        <View style={{ height: 30, marginTop: 20 }}>
                                            <ChevronRightIcon fill={Colors.greyLighter} style={{ alignSelf: 'flex-end' }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%', height: 40, marginTop: 20 }}>
                                <TouchableWithoutFeedback>
                                    <View style={{ width: '100%', height: 40, flexDirection: 'row' }}>
                                        <SettingsIcon fill={Colors.greyLighter} style={{ marginLeft: 10 }} />
                                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: moderateScale(12), marginLeft: 20 }}>Notification Settings</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={{ width: '100%', height: 40, marginTop: 10 }}>
                                <TouchableWithoutFeedback>
                                    <View style={{ width: '100%', height: 40, flexDirection: 'row' }}>
                                        <InfoIcon fill={Colors.greyLighter} style={{ marginLeft: 10 }} />
                                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: moderateScale(12), marginLeft: 20 }}>Help & FAQ</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={{ width: '100%', height: 40, marginTop: 10 }}>
                                <TouchableWithoutFeedback>
                                    <View style={{ width: '100%', height: 40, flexDirection: 'row', }}>
                                        <MessageIcon fill={Colors.greyLighter} style={{ marginLeft: 10 }} />
                                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: moderateScale(12), marginLeft: 20 }}>What's new</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={{ width: '100%', height: 40, marginTop: 10 }}>
                                <TouchableWithoutFeedback onPress={props.onLogout}>
                                    <View style={{ width: '100%', height: 40, flexDirection: 'row', }}>
                                        <LogoutIcon fill={Colors.greyLighter} style={{ marginLeft: 10 }} />
                                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: moderateScale(12), marginLeft: 20 }}>Logout</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    );
};

export default SideMenu;