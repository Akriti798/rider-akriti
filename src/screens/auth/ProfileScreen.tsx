import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('selectedCity');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login' as never}],
    });
  };

const ProfileScreen = () => {
  const {logout} = useAuth(); // ✅ use context logout

  const handleLogout = async () => {
    await logout(); // ✅ this clears token AND triggers AppNavigator re-render
  };

  // ... rest of the component stays the same
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerCircle} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerCircle}>
          <Icon name="cog-outline" size={20} color="#2F5BFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40}}>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>Amit Patel</Text>
          <Text style={styles.email}>amitpatel@gmail.com</Text>
        </View>

        {/* Quick Action 3 Boxes */}
        <View style={styles.quickRow}>
          <TouchableOpacity style={styles.quickBox}>
            <Icon name="bell-outline" size={30} color="#2F5BFF" />
            <Text style={styles.quickLabel}>Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBox}>
            <Icon name="bank-outline" size={30} color="#2F5BFF" />
            <Text style={styles.quickLabel}>Bank Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBox}>
            <Icon name="history" size={30} color="#2F5BFF" />
            <Text style={styles.quickLabel}>Transactions{'\n'}History</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Cards */}
        <View style={styles.menuWrapper}>

          {/* Edit Profile */}
          <TouchableOpacity style={styles.menuCard}>
            <View style={styles.menuLeft}>
              <Icon name="account-edit-outline" size={26} color="#2F5BFF" />
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
            <View style={styles.arrowCircle}>
              <Icon name="chevron-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          {/* Help & Support */}
          <TouchableOpacity style={styles.menuCard}>
            <View style={styles.menuLeft}>
              <Icon name="help-circle-outline" size={26} color="#2F5BFF" />
              <Text style={styles.menuText}>Help & Support</Text>
            </View>
            <View style={styles.arrowCircle}>
              <Icon name="chevron-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity style={styles.menuCard} onPress={handleLogout}>
            <View style={styles.menuLeft}>
              <Icon name="logout" size={26} color="#2F5BFF" />
              <Text style={styles.menuText}>Log Out</Text>
            </View>
            <View style={styles.arrowCircle}>
              <Icon name="chevron-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  avatarSection: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  avatar: {
    width: 122,
    height: 127,
    borderRadius: 61,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2F5BFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontWeight: '700',
    color: '#141414',
    textDecorationLine: 'underline',
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginBottom: 20,
    gap: 8,
  },
  quickBox: {
    width: 107,
    height: 82,
    backgroundColor: '#fff',
    borderWidth: 1.3,
    borderColor: '#000',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    gap: 6,
  },
  quickLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    lineHeight: 13,
  },
  menuWrapper: {
    paddingHorizontal: 22,
    gap: 14,
  },
  menuCard: {
    width: '100%',
    height: 82,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1.3,
    marginBottom: 8,
    borderColor: 'fff',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  arrowCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 1.8,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});