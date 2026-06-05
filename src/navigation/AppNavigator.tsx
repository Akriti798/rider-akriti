import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/auth/LoginScreen';
import PartnerLoginScreen from '../screens/auth/PartnerLoginScreen';
import OtpScreen from '../screens/auth/OtpScreen';
import PartnerEmailLoginScreen from '../screens/auth/PartnerEmailLoginScreen';
import PartnerRegisterScreen from '../screens/auth/PartnerRegisterScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import AadharVerificationScreen from '../screens/auth/AadharVerificationScreen';
import ChooseVehicleScreen from '../screens/auth/ChooseVehicleScreen';
import VehicleInfoScreen from '../screens/auth/VehicleInfoScreen';
import BankInfoScreen from '../screens/auth/BankInfoScreen';
import SelectCityScreen from '../screens/auth/SelectCityScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    AsyncStorage.getItem('userToken').then(token => {
      setIsLoggedIn(!!token);
    });
  }, []);

  // Show loading spinner while checking token
  if (isLoggedIn === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#2F5BFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          // User is logged in → go straight to Home
          <>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
          </>
        ) : (
          // User is not logged in → show auth flow
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="PartnerLogin" component={PartnerLoginScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="PartnerEmailLogin" component={PartnerEmailLoginScreen} />
            <Stack.Screen name="PartnerRegister" component={PartnerRegisterScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="AadharVerification" component={AadharVerificationScreen} />
            <Stack.Screen name="ChooseVehicle" component={ChooseVehicleScreen} />
            <Stack.Screen name="VehicleInfo" component={VehicleInfoScreen} />
            <Stack.Screen name="BankInfo" component={BankInfoScreen} />
            <Stack.Screen name="SelectCity" component={SelectCityScreen} />
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}