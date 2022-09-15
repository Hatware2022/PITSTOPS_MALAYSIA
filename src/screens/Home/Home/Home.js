import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Alert, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from "react-native-modal"
import Spacer from 'components/Spacer'
import Header from 'components/Header/Header';
import * as Images from 'utils/Images';
import HeaderMenu from 'components/Header/HeaderMenu';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import ChevronRightIcon from 'assets/icons/chevron-right.svg';
import SettingIcon from 'assets/icons/settings.svg'
import NotiIcon from 'assets/icons/bell.svg'
import MessageIcon from 'assets/icons/message.svg'
import SignOutIcon from 'assets/icons/signout.svg'
import { Styles, Colors } from 'themes';
import { useDidMount } from 'utils/Helpers';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SideMenu from './SideMenu';
import { isLoggedChanged, refreshAccessToken, setWcsVerifier } from 'store/actions/UserAction';
import { useSelector, useDispatch } from 'react-redux'
import Api from 'api'
import AzureAuth from 'react-native-azure-auth';


function Home({ navigation }) {
    const state = useSelector(state => state);
    console.log(state);
    const [modalVisible, setModalVisible] = useState(false);
    const access_token = useSelector(state => state.root.user.accessToken);

    const dispatch = useDispatch();
    const changeLoggedIn = flag => dispatch(isLoggedChanged(flag));
    const refreshToken = (user_id, access_token) => dispatch(refreshAccessToken(user_id, access_token));
    const user_id = useSelector(state => state.root.user.user_id);
    const user = useSelector(state => state.root.user)
    const { selectedEventId } = user

    // console.log("SELECTOR:", state);

    // console.log("SELECTOR:", state);
    const homeDashboard = Images.images.homeDashboard;
    const homeWorklist = Images.images.homeWorklist;
    const homeSubWorklist = Images.images.homeSubWorklist;
    const homeMCS = Images.images.homeMCS;
    const homeMRF = Images.images.homeMRF;
    const homeEWR = Images.images.homeEWR;
    const homeQA = Images.images.homeQA;
    const didMount = useDidMount()

    const openMenu = () => {
        setModalVisible(true)
    }

    useEffect(() => {
        async function fetchMyAPI() {
            if (didMount) {
                refreshToken(user_id, access_token);
                dispatch(Api.getWorklistFilterEvent())
            }
        }

        fetchMyAPI();

        if (selectedEventId) {
            dispatch(Api.fetchWorklistPhasesEvent(selectedEventId))
        }


    }, [])

    const toggleModal = () => {
        setModalVisible(!showModal)
    }

    const goToSection = (section) => {
        if (section == 'Dashboard') {
            Alert.alert('Dashboard');
        } else if (section == 'Worklist') {
            navigation.navigate('Home', { screen: 'Worklist' });
        } else if (section == 'Workshop') {
            navigation.navigate('Home', { screen: 'Workshop' });
        }
    }

    const goToProfileHandler = () => {
        setModalVisible(false);
        navigation.navigate('Profile');
    }

    const menuCloseHandler = () => {
        setModalVisible(false);
    }

    const goToLoginHandler = () => {
        setModalVisible(false);
        Alert.alert(
            "Signing Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                    },
                    style: "cancel",
                }, {
                    text: "Yes",
                    onPress: () => {
                        //Temp
                        dispatch(setWcsVerifier(false))
                        azureLogout();
                    }
                }
            ]
        )
    }

    const azureLogout = () => {
        // const azureAuth = new AzureAuth({
        //     clientId: '7aba82e4-0e98-4bdf-8271-c4b19adb16ba'
        // });
        // azureAuth.webAuth
        //     .clearSession({ closeOnLoad: true })
        //     .then(success => {
        changeLoggedIn(false);
        // }).catch(error => {
        //     console.log(error)
        //     changeLoggedIn(false);
        // });
    }



    const homeContainer = (title, color, image, section, marginL) => {
        return (
            <View style={{
                flex: 1, height: moderateScale(150), marginTop: 20, marginLeft: marginL, borderRadius: 10, shadowColor: "#000",
                shadowOffset: {
                    width: 5,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 8, backgroundColor: 'white'
            }}>
                <TouchableWithoutFeedback onPress={() => { goToSection(section) }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ width: moderateScale(50), height: moderateScale(50), marginTop: 20, marginLeft: 15, borderRadius: 30, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} >
                            <Image source={image} />
                        </View>
                        <Text style={{ marginLeft: 22, marginTop: 40, fontFamily: 'Inter-Bold', fontSize: moderateScale(14), color: '#625E70' }}>{title}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    const annoucementContainer = () => {
        return (
            <ImageBackground source={Images.images.homeAnnoucementBg} style={{ width: '100%', height: moderateScale(170) }}>
                <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: moderateScale(11), letterSpacing: 1 }}>RECENT ANNOUCEMENT </Text>
                    <ChevronRightIcon fill={Colors.secondary} />
                </View>
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <ImageBackground source={Images.images.annoucementBody} style={{ width: '100%', height: 100 }} resizeMode="contain">
                        <View style={{ flex: 1, marginLeft: moderateScale(60), marginTop: moderateScale(15) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 3 }}>
                                    <Text>Notification Title</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>34m ago</Text>
                                </View>
                            </View>
                            <Text>Here's notification text</Text>
                        </View>
                    </ImageBackground>
                </View>
            </ImageBackground>
        )
    }



    return (

        <SafeAreaView style={{ flex: 1 }} >
            <Header left={<HeaderTitle title="PITSTOPS" />} right={<HeaderMenu onPress={openMenu} />} />
            <ScrollView style={{ flex: 1, backgroundColor: '#F1F3F8', marginTop: 60 }}>
                {/* ANNOUCEMENTS */}
                {annoucementContainer()}
                {/* HOME CONTAINERS */}

                <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, backgroundColor: '#F1F3F8' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: moderateScale(11), letterSpacing: 1 }}>QUICK LINKS </Text>
                        <ChevronRightIcon fill={Colors.secondary} />
                    </View>


                    <View style={{ flex: 1, marginBottom: 30 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            {homeContainer('Dashboard', '#B3E3E1', homeDashboard, 'Dashboard', 0)}
                            {homeContainer('WorkList', '#DEDAF5', homeWorklist, 'Worklist', 20)}
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            {homeContainer('Workshop', '#E4E8F3', homeSubWorklist, 'Workshop', 0)}
                            {homeContainer('MCS', '#BCC6E1', homeMCS, 'MCS', 20)}
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            {homeContainer('MRF', '#A3D4E1', homeMRF, 'MRF', 0)}
                            {homeContainer('EWR', '#DFEB98', homeEWR, 'EWR', 20)}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {homeContainer('QA/QC', '#FEEABD', homeQA, 'QA', 0)}
                            <View style={{ flex: 1, margin: 10 }}></View>
                        </View>
                    </View>
                </View>
                <SideMenu modalVisible={modalVisible} onClose={menuCloseHandler} goToProfile={goToProfileHandler} onLogout={goToLoginHandler} />
            </ScrollView>
        </SafeAreaView >
    );
};

export default Home;

const styles = StyleSheet.create({
    avatar: {
        height: 50,
        width: 50
    }
})