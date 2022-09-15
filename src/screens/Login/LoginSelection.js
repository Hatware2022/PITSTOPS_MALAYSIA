import React, { useState, useRef, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Alert, Picker } from 'react-native';
import CustomTextInput from '../../components/Forms/CustomTextInput';
import CancelButton from '../../components/Forms/CancelButton';
import Spacer from 'components/Spacer'
import { Styles, Colors } from 'themes';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as Images from '../../utils/Images';
import SubmitButton from '../../components/Forms/SubmitButton';
import DropDownTextInput from '../../components/Forms/DropDownTextInput';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../store/ActionTypes';
import { isLoggedChanged, selectedOpuIdChanged, selectedEventIdChanged, setWcsVerifier } from '../../store/actions/UserAction';
import Dropdown from 'components/Dropdown'
// import { Picker } from '@react-native-picker/picker';
import Api from 'api'
import axios from 'axios';
import LogoutIcon from 'assets/icons/signout.svg';
import { ScreenStackHeaderSubview } from 'react-native-screens';
import { useDidMount } from 'utils/Helpers'


function LoginSelection({ navigation }) {
    const state = useSelector(state => state);
    const oList = useSelector(state => state.root.user.opuList);
    const eList = useSelector(state => state.root.user.eventList);
    const dispatch = useDispatch();
    const changeLoggedIn = flag => dispatch(isLoggedChanged(flag));
    const opuIdChanged = opucode => dispatch(selectedOpuIdChanged(opucode));
    const eventIdChanged = eventId => dispatch(selectedEventIdChanged(eventId));
    console.log(state);
    const [opu, setOpu] = useState("");
    const [opuId, setOpuId] = useState("");
    const [event, setEvent] = useState("");
    const [eventId, setEventId] = useState("");


    useEffect(() => {
        let params = {};
        dispatch(Api.fetchOpusList(params));

    }, [])



    const cancelBtnHandler = () => {
        navigation.navigate('Login');
    }

    const nextBtnHandler = () => {
        changeLoggedIn(true);
    }

    // const fetchOpus = async () => {

    //     const headers = {
    //         'Authorization': 'Bearer ' + state.root.user.accessToken
    //     }
    //     console.log("HEADERS :" + JSON.stringify(headers));
    //     let parameters = {};
    //     console.log("FETCH OPUS===============================");
    //     axios.get("https://ptsg-5pitstopwb01.azurewebsites.net/api/Opus", parameters, {
    //         headers: headers
    //     }).then(res => {
    //         setOpuList(res.data.data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    // const fetchEvents = () => {
    //     const header = {
    //         'Authorization': 'Bearer ' + state.root.user.accessToken
    //     }
    //     let parameters = {
    //         "opucode": opuId
    //     };
    //     console.log("FETCH EVENTS+_+_+_+_+_+_+_+_+_+_+_+_");
    //     axios.get("https://ptsg-5pitstopwb01.azurewebsites.net/api/Events/opu", parameters, {
    //         headers: header
    //     }).then(res => {
    //         setEventList(res.data.data);
    //         console.log(res.data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    const goToLoginHandler = () => {


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
                        changeLoggedIn(false);
                        navigation.navigate("Login");
                    }
                }
            ]
        )
    }

    const renderOpuList = () => {
        // const olist = state.auth.login.opuList;
        if (oList) {
            return oList.map((value, index) => {
                return (
                    <Picker.Item label={value.opuName} value={value.opuCode} key={value.id} />
                )
            })
        }
    }

    const renderEventList = () => {
        if (eList) {
            return eList.map((value, index) => {
                return (
                    <Picker.Item label={value.eventName} value={value.eventCode} key={value.id} />
                )
            })
        }
    }

    const renderWcsButton = () => {
        return (
            <View style={[Styles.col, Styles.alignCenter]}>
                <Spacer size="sm" />
                <TouchableOpacity onPress={() => dispatch(setWcsVerifier(true))}>
                    <Text style={{ color: 'blue' }}>Is Wcs Verifier?</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{ flex: 1 }}>
                <Text style={{ marginTop: moderateScale(80), marginLeft: moderateScale(50), fontFamily: 'Inter-Regular', fontSize: moderateScale(14) }}>Welcome Back,</Text>
                <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: moderateScale(1) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ marginRight: 10, marginTop: 10 }}>

                            <Image source={Images.images.icon} style={{}} />
                        </View>
                        <Text style={{ fontSize: moderateScale(42), fontFamily: 'Inter-ExtraBold', fontWeight: '900', letterSpacing: 2 }}>PITSTOPS</Text>
                    </View>
                    <Text style={{ alignSelf: 'flex-end', fontFamily: 'Inter-Regular', fontSize: moderateScale(14), color: Colors.grey }}>by PETRONAS</Text>
                </View>

                <View style={{ flex: 1, margin: moderateScale(20) }}>
                    <Text style={{ fontSize: moderateScale(12), fontFamily: 'Inter-Regular' }}>Select your Project</Text>




                    <View style={styles.container}>
                        <Picker
                            style={{ width: '100%', marginLeft: verticalScale(-5), fontFamily: 'Lato-Light', borderWidth: 1 }}
                            mode="dialog"
                            selectedValue={opu}
                            onValueChange={(itemValue, itemIndex) => {
                                if (oList) {
                                    const opu = oList.find(opu => opu.opuCode === itemValue)
                                    if (opu) {
                                        setOpuId(opu.id);
                                        opuIdChanged(opu.id);
                                    }
                                }
                                setOpu(itemValue);
                                let params = itemValue

                                dispatch(Api.fetchEventList(params));

                            }}>
                            <Picker.Item label="Select OPU" value="" />
                            {renderOpuList()}
                        </Picker>
                        {/* <Image source={Images.images.dropDownArrow} /> */}
                    </View>

                    <View style={styles.container}>
                        <Picker
                            style={{ width: '100%', marginLeft: verticalScale(-5), fontFamily: 'Lato-Light', borderWidth: 1 }}
                            mode="dialog"
                            selectedValue={event}
                            onValueChange={(itemValue, itemIndex) => {
                                if (eList) {
                                    const event = eList.find(evt => evt.eventCode === itemValue)
                                    if (event) {
                                        setEventId(event.id);
                                        eventIdChanged(event.id);
                                    }
                                }
                                setEvent(itemValue);
                                // this.props.selectedcashieridchanged(list[itemIndex].opu_i)
                            }}>
                            <Picker.Item label="Select Event" value="" />
                            {renderEventList()}

                        </Picker>
                        {/* <Image source={Images.images.dropDownArrow} /> */}
                    </View>
                    {/* <DropDownTextInput text={event} placeholder="Event" /> */}
                    {renderWcsButton()}
                    <View style={{ flex: 1 }}>


                    </View>
                    {eventId != "" ?
                        <View style={{}}>
                            {/* <Text style={{ textAlign: 'center', fontFamily: 'Inter-Regular', fontSize: moderateScale(14), fontWeight: '500' }}>Logout</Text> */}
                            <CancelButton title="Cancel" onPress={cancelBtnHandler} />
                            <SubmitButton title="Next" onPress={nextBtnHandler} />
                        </View> : null
                    }
                    {eventId == "" ?
                        <TouchableWithoutFeedback onPress={goToLoginHandler}>
                            <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center' }}>
                                <LogoutIcon fill={Colors.greyLighter} style={{ marginLeft: 10 }} />
                                <Text style={{ fontFamily: 'Inter-Regular', fontSize: moderateScale(12), marginLeft: 20 }}>Logout</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        : null
                    }
                </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', marginTop: moderateScale(10), borderColor: 'lightgray', borderWidth: 1, padding: 0, borderRadius: 5
    },
    text: {
        width: '95%', fontSize: verticalScale(16), fontFamily: 'Lato-Light'
    },
    placeholder: {
        width: '95%', fontSize: verticalScale(16), fontFamily: 'Lato-Light', color: Colors.grey
    }
})


export default LoginSelection;