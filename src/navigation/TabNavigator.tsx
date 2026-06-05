// src/navigation/TabNavigator.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/auth/HomeScreen'; // ✅ correct path

const OrderScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Order Screen</Text>
  </View>
);

const EarningsScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Earnings Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Profile Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#3458F6',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#EFEFEF',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'HOME') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ORDER') {
            iconName = focused ? 'shopping' : 'shopping-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'PROFILE') {
            iconName = focused ? 'account' : 'account-outline';
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
      })}>
      <Tab.Screen name="HOME" component={HomeScreen} />
      <Tab.Screen name="ORDER" component={OrderScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="PROFILE" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});