import React, { useState } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import CustomTextInput from '../../components/Forms/CustomTextInput';
import SubmitButton from '../../components/Forms/SubmitButton';
import { Styles, Colors } from 'themes';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as Images from 'utils/Images';
import TouchID from 'react-native-touch-id';
import AzureAuth from 'react-native-azure-auth';
import { useSelector, useDispatch } from 'react-redux';
import { accessTokenChanged, userIdChanged, userNameChanged } from '../../store/actions/UserAction';

function Login({ navigation }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const accessTokenChange = accessToken => dispatch(accessTokenChanged(accessToken));
  const userIdChange = userId => dispatch(userIdChanged(userId));
  const userNameChange = username => dispatch(userNameChanged(username));


  const azureAuth = new AzureAuth({
    clientId: '7aba82e4-0e98-4bdf-8271-c4b19adb16ba'
  });

  const loginBtnHandler = async () => {
    try {
      let token1 = await azureAuth.webAuth.authorize({ scope: 'openid profile User.Read' })
      let tokens = await azureAuth.auth.acquireTokenSilent({ scope: 'api://7aba82e4-0e98-4bdf-8271-c4b19adb16ba/App.Read', userId: token1.userId })
      if (!tokens) {
      }
      console.log("TOKEN : " + tokens);
      console.log("USER ID : " + tokens.userId);
      accessTokenChange(tokens.accessToken);
      userIdChange(tokens.userId);
      navigation.push('LoginSelection');
    } catch (error) {
      console.log("ERROR : " + error)
    }
  }

  const authenticateTouch = () => {
    TouchID.isSupported()
      .then(biometryType => {
        // Success code
        console.log('TouchID is supported.');
        TouchID.authenticate('Only awesome people are allowed.', {
          title: "Touch ID for PITSTOPS App", // Android
          imageColor: "#EF5DA8", // Android,
          cancelText: "Cancel",
          fallbackLabel: "Show Passcode"
        })
          .then(success = async () => {
            try {
              let token1 = await azureAuth.webAuth.authorize({ scope: 'openid profile User.Read' })
              let tokens = await azureAuth.auth.acquireTokenSilent({ scope: 'api://7aba82e4-0e98-4bdf-8271-c4b19adb16ba/App.Read', userId: token1.userId })
              if (!tokens) {
              }
              console.log("TOKEN : " + tokens);
              console.log("USER ID : " + tokens.userId);
              accessTokenChange(tokens.accessToken);
              userIdChange(tokens.userId);
              navigation.push('LoginSelection');
            } catch (error) {
              console.log("ERROR : " + error)
            }
          })
          .catch(error => {
            console.log("NOT MATCHED");
          });

      })
      .catch(error => {
        // Failure code
        console.log(error);
      });

  }

  const authenticateFace = () => {
    TouchID.isSupported()
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
          TouchID.authenticate('Place your finger on scanner for quick login.', {
            title: "Touch ID for PITSTOPS App", // Android
            color: "#f3cf58", // Android,
            cancelText: "Cancel",
            fallbackLabel: "Show Passcode"
          })
            .then(success = async () => {
              try {
                let token1 = await azureAuth.webAuth.authorize({ scope: 'openid profile User.Read' })
                let tokens = await azureAuth.auth.acquireTokenSilent({ scope: 'api://7aba82e4-0e98-4bdf-8271-c4b19adb16ba/App.Read', userId: token1.userId })
                if (!tokens) {
                }
                console.log("TOKEN : " + tokens);
                console.log("USER ID : " + tokens.userId);
                accessTokenChange(tokens.accessToken);
                userIdChange(tokens.userId);
                navigation.push('LoginSelection');
              } catch (error) {
                console.log("ERROR : " + error)
              }
            })
            .catch(error => {
              Alert.alert("TOUCH NOT MATCHED");
            });

        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
        Alert.alert("NOT SUPPORTED");
      });
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
          <Text style={{ alignSelf: 'flex-end', fontFamily: 'Inter-Regular', fontSize: moderateScale(14), color: '#9e9e9e' }}>by PETRONAS</Text>
        </View>

        <View style={{ flex: 1, margin: moderateScale(20) }}>
          <Text style={{ fontSize: moderateScale(24), fontFamily: 'Inter-Bold' }}>Login</Text>

          {/* <CustomTextInput value={username} placeholder="Email Address" onChange={e => setUsername(e.target.value)} />
          <CustomTextInput value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />

          <View style={{ flexDirection: 'row', margin: moderateScale(5) }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: 'Inter-Regular', fontSize: moderateScale(13) }}>Remember me</Text>
            </View>
            <View >
              <Text style={{ textAlign: 'right', fontFamily: 'Inter-Regular', fontSize: moderateScale(13) }}>Forgot Password?</Text>
            </View>
          </View> */}
          <View >

            <SubmitButton title="Login" onPress={loginBtnHandler} />
          </View>
          <View style={{ position: 'absolute', bottom: 30, width: '100%' }}>
            <Text style={{ textAlign: 'center', fontFamily: 'Inter-Regular', fontSize: moderateScale(16), fontWeight: '500' }}>Login with different devices</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 30 }}>
                <TouchableOpacity onPress={authenticateTouch}>
                  <Image source={Images.images.touch} style={{ marginRight: 0 }} />
                  <Text style={{ marginTop: 5, fontFamily: 'Inter-Regular', fontSize: moderateScale(10) }}>Touch ID</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={authenticateFace}>
                  <Image source={Images.images.face} style={{ marginLeft: 0 }} />
                  <Text style={{ marginTop: 7, fontFamily: 'Inter-Regular', fontSize: moderateScale(10) }}>Face ID</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
};



export default Login;