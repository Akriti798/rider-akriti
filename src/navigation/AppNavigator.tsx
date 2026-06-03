import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import PartnerLoginScreen from '../screens/auth/PartnerLoginScreen';
import OtpScreen from '../screens/auth/OtpScreen';
import PartnerEmailLoginScreen from '../screens/auth/PartnerEmailLoginScreen';
import PartnerRegisterScreen from '../screens/auth/PartnerRegisterScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="PartnerLogin"
          component={PartnerLoginScreen}
        />

        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
        />

        <Stack.Screen
          name="PartnerEmailLogin"
          component={PartnerEmailLoginScreen}
        />

        <Stack.Screen
          name="PartnerRegister"
          component={PartnerRegisterScreen}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}