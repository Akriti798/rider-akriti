import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';


const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(true);
  const navigation = useNavigation();
const [incomingOrder, setIncomingOrder] =
  useState<OrderData | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>

        {/* Logo */}
        <Image
          source={require('../../assets/images/partner.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Rider Info */}
        <View style={styles.profileRow}>
          <View style={styles.profileLeft}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={styles.avatar}
            />
            <View style={{marginLeft: 10}}>
              <Text style={styles.helloText}>Hello, Arjun</Text>
              <Text style={styles.subText}>Ready to deliver ?</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.bellBtn}>
            <Icon name="bell" size={20} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Online Card */}
        <View style={styles.card}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="briefcase-outline" size={22} color="#3458F6" />

            <View style={{marginLeft: 10}}>
              <Text style={styles.cardSmallLabel}>You are</Text>
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>

          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{false: '#ccc', true: '#3458F6'}}
            thumbColor="#fff"
          />
        </View>


<TouchableOpacity
  style={{
    backgroundColor: '#3458F6',
    marginHorizontal: 16,
    marginBottom: 15,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  }}
  onPress={() =>
    navigation.navigate('IncomingOrder', {
      order: {
        id: 'ORD001',
        pickupName: 'Shyam Grocery',
        pickupAddress: '123 MG ROAD, BANGALURU',
        pickupDistance: '3.2 Km',
        dropName: 'Rahul Sharma',
        dropAddress: 'A-205 MG ROAD, BANGALURU',
        dropDistance: '5.6 Km',
        itemCount: 12,
        orderValue: 549,
      },
    })
  }>
  <Text style={{color: '#fff', fontWeight: '700'}}>
    Show Test Order
  </Text>
</TouchableOpacity>


<TouchableOpacity
  onPress={() => navigation.navigate('OrderDelivered')}
  style={{
    margin: 16,
    backgroundColor: '#3458F6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  }}>
  <Text style={{color: '#fff', fontWeight: '700'}}>
    🧪 Test: Order Delivered Screen
  </Text>
</TouchableOpacity>





        {/* Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View
                style={[
                  styles.iconBox,
                  {backgroundColor: '#E8F8EE'},
                ]}>
                <Icon
                  name="shopping-outline"
                  size={28}
                  color="#4CD964"
                />
              </View>

              <Text style={styles.summaryValue}>12</Text>
              <Text style={styles.summaryLabel}>
                Order{'\n'}Completed
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <View
                style={[
                  styles.iconBox,
                  {backgroundColor: '#E0F0FF'},
                ]}>
                <Icon
                  name="map-marker-distance"
                  size={28}
                  color="#3A9FE8"
                />
              </View>

              <Text style={styles.summaryValue}>98.6 km</Text>
              <Text style={styles.summaryLabel}>
                Distance{'\n'}Covered
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <View
                style={[
                  styles.iconBox,
                  {backgroundColor: '#FFF4E0'},
                ]}>
                <Icon
                  name="clock-outline"
                  size={28}
                  color="#F5A623"
                />
              </View>

              <Text style={styles.summaryValue}>6h 45m</Text>
              <Text style={styles.summaryLabel}>
                Online{'\n'}Time
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <View
                style={[
                  styles.iconBox,
                  {backgroundColor: '#F0EBFF'},
                ]}>
                <Icon
                  name="wallet-outline"
                  size={28}
                  color="#9B72F5"
                />
              </View>

              <Text style={styles.summaryValue}>1,240 Rs.</Text>
              <Text style={styles.summaryLabel}>Earnings</Text>
            </View>
          </View>
        </View>

        {/* Great Job */}
        <View style={styles.card}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.starBox}>
              <Icon
                name="star-outline"
                size={20}
                color="#3458F6"
              />
            </View>

            <View style={{marginLeft: 10}}>
              <Text style={styles.jobTitle}>Great job !</Text>
              <Text style={styles.jobSub}>
                You're doing awesome today
              </Text>
            </View>
          </View>
        </View>

        {/* Current Order */}
        <Text style={styles.heading}>Current Order</Text>

        <View style={styles.card}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: '#E8F8EE',
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                },
              ]}>
              <Icon
                name="shopping-outline"
                size={30}
                color="#4CD964"
              />
            </View>

            <View style={{flex: 1, marginLeft: 12}}>
              <Text style={styles.noOrderTitle}>
                No active orders
              </Text>
              <Text style={styles.noOrderSub}>
                You will receive new orders soon.
              </Text>
            </View>

            <View style={styles.mapBox}>
              <Icon
                name="map-marker-outline"
                size={28}
                color="#ddd"
              />
              <View style={styles.greenDot} />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.heading}>Quick Actions</Text>

        <View style={styles.quickRow}>
          <TouchableOpacity style={styles.quickBtn}>
            <Icon name="map-outline" size={28} color="#3458F6" />
            <Text style={styles.quickText}>Go to Zone</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBtn}>
            <Icon name="wallet-outline" size={28} color="#3458F6" />
            <Text style={styles.quickText}>Earnings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBtn}>
            <Icon name="headphones" size={28} color="#3458F6" />
            <Text style={styles.quickText}>Support</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  logo: {
    width: 70,
    height: 70,
    marginLeft: 16,
    marginTop: 10,
    marginBottom:10,
  },

  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  helloText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111',
  },

  subText: {
    color: '#888',
    fontSize: 12,
    marginTop: 1,
  },

  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },

  cardSmallLabel: {
    fontSize: 12,
    color: '#555',
  },

  onlineText: {
    color: '#3458F6',
    fontWeight: '700',
    fontSize: 14,
  },

  sectionTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111',
    marginBottom: 14,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  summaryValue: {
    fontWeight: '700',
    fontSize: 11,
    marginTop: 7,
    color: '#111',
  },

  summaryLabel: {
    fontSize: 10,
    textAlign: 'center',
    color: '#777',
    marginTop: 2,
    lineHeight: 13,
  },

  starBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#3458F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  jobTitle: {
    color: '#3458F6',
    fontWeight: '700',
    fontSize: 13,
  },

  jobSub: {
    color: '#888',
    fontSize: 12,
    marginTop: 1,
  },

  heading: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 10,
    color: '#111',
  },

  noOrderTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111',
  },

  noOrderSub: {
    color: '#888',
    marginTop: 3,
    fontSize: 12,
  },

  mapBox: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  greenDot: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CD964',
    borderWidth: 1.5,
    borderColor: '#fff',
  },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 10,
  },

  quickBtn: {
    flex: 1,
    height: 88,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },

  quickText: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});