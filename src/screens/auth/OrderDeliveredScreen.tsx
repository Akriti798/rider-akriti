import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const OrderDeliveredScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Logo */}
        <Image
          source={require('../../assets/images/partner.png')}
          style={styles.logo}
        />

        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Delivered</Text>
        </View>

        {/* Success Icon */}
        <View style={styles.successSection}>
          <View style={styles.sparkleWrap}>
            <Icon name="star-four-points" size={10} color="#90CAF9" style={styles.spark1} />
            <Icon name="star-four-points" size={8} color="#90CAF9" style={styles.spark2} />
            <Icon name="star-four-points" size={10} color="#90CAF9" style={styles.spark3} />
            <Icon name="star-four-points" size={7} color="#90CAF9" style={styles.spark4} />
            <View style={styles.successCircle}>
              <Icon name="check" size={38} color="#fff" />
            </View>
          </View>
          <Text style={styles.successTitle}>Delivery Successful !</Text>
          <Text style={styles.successSub}>
            The order has been delivered successfully.
          </Text>
        </View>

        {/* Earned Card */}
        <View style={styles.earnedCard}>
          <View>
            <Text style={styles.earnedLabel}>You Earned</Text>
            <Text style={styles.earnedValue}>68.00 Rs.</Text>
          </View>
          <View style={styles.paymentBadge}>
            <Icon name="wallet-outline" size={14} color="#3458F6" />
            <Text style={styles.paymentBadgeText}>Payment Received</Text>
          </View>
        </View>

        {/* Order Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Order Details</Text>
            <Text style={styles.orderId}>#ORD1245789</Text>
          </View>

          {/* Timeline */}
          <View style={styles.timeline}>
            {/* Pickup */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View style={styles.storeIconWrap}>
                  <Icon name="store-outline" size={20} color="#555" />
                </View>
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.dotRow}>
                  <View style={styles.dotBlue} />
                  <Text style={styles.timelineLabel}>Pickup Location</Text>
                </View>
                <Text style={styles.timelineName}>FreshMart Store</Text>
                <Text style={styles.timelineAddress}>
                  MG Road, Bengaluru, Karnataka 560001
                </Text>
              </View>
            </View>

            {/* Drop */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View style={styles.checkCircleWrap}>
                  <Icon name="check-circle" size={22} color="#3458F6" />
                </View>
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.dotRow}>
                  <View style={styles.dotBlue} />
                  <Text style={styles.timelineLabel}>Drop Location</Text>
                </View>
                <View style={styles.dropNameRow}>
                  <View style={{flex: 1}}>
                    <Text style={styles.timelineName}>Rohit</Text>
                    <Text style={styles.timelineAddress}>
                      12, 5th Cross, Kormangala,{'\n'}Bengaluuru, Karnataka 560034
                    </Text>
                  </View>
                  <View style={styles.phoneIconWrap}>
                    <Icon name="cellphone" size={20} color="#3458F6" />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Order Items Row */}
          <TouchableOpacity style={styles.infoRow}>
            <View style={styles.infoRowLeft}>
              <View style={styles.infoIconWrap}>
                <Icon name="shopping-outline" size={20} color="#555" />
              </View>
              <Text style={styles.infoRowLabel}>Order items</Text>
            </View>
            <View style={styles.infoRowRight}>
              <Text style={styles.infoRowValue}>4 Items</Text>
              <Icon name="chevron-right" size={20} color="#aaa" />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Delivered At Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoRowLeft}>
              <View style={styles.infoIconWrap}>
                <Icon name="clock-outline" size={20} color="#555" />
              </View>
              <Text style={styles.infoRowLabel}>Delivered At</Text>
            </View>
            <Text style={styles.infoRowValue}>10:24 AM, 20 May 2024</Text>
          </View>
        </View>

        {/* Spacer for bottom button */}
        <View style={{height: 90}} />
      </ScrollView>

      {/* Back to Home Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={20} color="#fff" />
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderDeliveredScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingBottom: 20,
  },

  // Logo
  logo: {
    width: 45,
    height: 45,
    marginLeft: 15,
    marginTop: 10,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 8,
    marginBottom: 4,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginRight: 38, // offset for back button
  },

  // Success
  successSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  sparkleWrap: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3458F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spark1: {position: 'absolute', top: 8, left: 14},
  spark2: {position: 'absolute', top: 18, right: 10},
  spark3: {position: 'absolute', bottom: 10, right: 16},
  spark4: {position: 'absolute', bottom: 16, left: 8},
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3458F6',
    marginBottom: 6,
  },
  successSub: {
    fontSize: 13,
    color: '#888',
  },

  // Earned Card
  earnedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 14,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    marginBottom: 14,
  },
  earnedLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  earnedValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3458F6',
  },
  paymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF1FF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 5,
  },
  paymentBadgeText: {
    fontSize: 12,
    color: '#3458F6',
    fontWeight: '600',
  },

  // Details Card
  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    overflow: 'hidden',
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  detailsTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#111',
  },
  orderId: {
    color: '#3458F6',
    fontWeight: '600',
    fontSize: 13,
  },

  // Timeline
  timeline: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timelineLeft: {
    width: 36,
    alignItems: 'center',
  },
  storeIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleWrap: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
    marginBottom: -8,
    alignSelf: 'center',
    minHeight: 20,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 8,
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  dotBlue: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#3458F6',
  },
  timelineLabel: {
    fontSize: 11,
    color: '#888',
  },
  timelineName: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111',
    marginBottom: 2,
  },
  timelineAddress: {
    fontSize: 11,
    color: '#888',
    lineHeight: 16,
  },
  dropNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EEF1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  // Info Rows
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRowLabel: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  infoRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoRowValue: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  homeBtn: {
    backgroundColor: '#3458F6',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  homeBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});