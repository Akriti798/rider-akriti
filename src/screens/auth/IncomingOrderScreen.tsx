import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const BUTTON_WIDTH = Dimensions.get('window').width - 30 - 80 - 10; // full width minus margins minus reject btn
const SLIDER_WIDTH = BUTTON_WIDTH - 16; // inner track width
const THUMB_SIZE = 44;
const SLIDE_THRESHOLD = SLIDER_WIDTH - THUMB_SIZE - 16; // how far to slide to trigger accept

const IncomingOrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params?.order;

  const translateX = useRef(new Animated.Value(0)).current;
  const [accepted, setAccepted] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.max(0, Math.min(gestureState.dx, SLIDE_THRESHOLD));
        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= SLIDE_THRESHOLD * 0.85) {
          // Slide complete — snap to end and navigate
          Animated.timing(translateX, {
            toValue: SLIDE_THRESHOLD,
            duration: 150,
            useNativeDriver: true,
          }).start(() => {
            setAccepted(true);
            setTimeout(() => {
              navigation.navigate('OrderAccept');
            }, 300);
          });
        } else {
          // Snap back
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    }),
  ).current;

  // Interpolate arrow opacity and text opacity based on drag
  const arrowOpacity = translateX.interpolate({
    inputRange: [0, SLIDE_THRESHOLD],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const textOpacity = translateX.interpolate({
    inputRange: [0, SLIDE_THRESHOLD * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const trackColor = translateX.interpolate({
    inputRange: [0, SLIDE_THRESHOLD],
    outputRange: ['#3458F6', '#22C55E'],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/images/partner.png')}
        style={styles.logo}
      />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>New Order</Text>
          <Text style={styles.subTitle}>
            Accept in <Text style={styles.redText}>30s</Text>
          </Text>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../../assets/images/map.png')}
          style={styles.map}
          resizeMode="cover"
        />
      </View>

      {/* Priority */}
      <TouchableOpacity style={styles.priorityBtn}>
        <Text style={styles.priorityText}>High Priority</Text>
      </TouchableOpacity>

      {/* Card */}
      <View style={styles.card}>
        {/* Pickup Row */}
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/partner.png')}
            style={styles.circleIcon}
          />
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Pick up from</Text>
            <Text style={styles.name}>{order?.pickupName}</Text>
            <Text style={styles.address}>{order?.pickupAddress}</Text>
          </View>
          <View style={styles.distanceWrap}>
            <Icon name="send" size={16} color="#3458F6" />
            <Text style={styles.distance}>{order?.pickupDistance}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Drop Row */}
        <View style={styles.row}>
          <View style={styles.avatarCircle}>
            <Icon name="account" size={26} color="#3458F6" />
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Drop to</Text>
            <Text style={styles.name}>{order?.dropName}</Text>
            <Text style={styles.address}>{order?.dropAddress}</Text>
          </View>
          <View style={styles.distanceWrap}>
            <Icon name="send" size={16} color="#3458F6" />
            <Text style={styles.distance}>{order?.dropDistance}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Items & Order Value */}
        <View style={styles.bottomInfo}>
          <View style={styles.infoBlock}>
            <Icon name="shopping-outline" size={20} color="#3458F6" />
            <View style={styles.infoText}>
              <Text style={styles.label}>Items</Text>
              <Text style={styles.infoValue}>{order?.itemCount} Items</Text>
            </View>
          </View>
          <View style={styles.infoBlock}>
            <Icon name="receipt" size={20} color="#3458F6" />
            <View style={styles.infoText}>
              <Text style={styles.label}>Order Value</Text>
              <Text style={styles.infoValue}>{order?.orderValue} Rs.</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Row */}
      <View style={styles.actionRow}>

        {/* Reject Button */}
        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => navigation.goBack()}>
          <View style={styles.rejectCircleOuter}>
            <View style={styles.rejectCircleInner}>
              <Text style={styles.rejectCount}>30</Text>
            </View>
          </View>
          <Text style={styles.rejectText}>Reject{'\n'}Order</Text>
        </TouchableOpacity>

        {/* Slide to Accept Button */}

        <Animated.View style={[styles.acceptBtn, {backgroundColor: trackColor}]}>
          {/* Background label */}
          <Animated.Text style={[styles.acceptTitle, {opacity: textOpacity}]}>
            ACCEPT ORDER
          </Animated.Text>
          <Animated.Text style={[styles.acceptSub, {opacity: textOpacity}]}>
            Slide to accept
          </Animated.Text>

          {/* Draggable thumb */}
          <Animated.View
            style={[
              styles.acceptThumb,
              {transform: [{translateX}]},
            ]}
            {...panResponder.panHandlers}>
            <Animated.View style={{opacity: arrowOpacity}}>
              <Icon name="arrow-right" size={24} color="#3458F6" />
            </Animated.View>
            {accepted && (
              <Icon name="check" size={24} color="#22C55E" />
            )}
          </Animated.View>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
};

export default IncomingOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 15,
    marginTop: 8,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    elevation: 4,
  },
  closeBtnText: {
    fontSize: 16,
    color: '#333',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginRight: 55,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  subTitle: {
    color: '#666',
    fontSize: 13,
  },
  redText: {
    color: '#E53935',
  },

  // Map
  mapContainer: {
    marginTop: 12,
  },
  map: {
    width: '100%',
    height: 165,
  },

  // Priority
  priorityBtn: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 8,
    backgroundColor: '#DDE5FF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  priorityText: {
    color: '#3458F6',
    fontWeight: '600',
    fontSize: 13,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  circleIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEF1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rowInfo: {
    flex: 1,
  },
  label: {
    color: '#999',
    fontSize: 11,
    marginBottom: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111',
  },
  address: {
    color: '#888',
    fontSize: 11,
    marginTop: 1,
  },
  distanceWrap: {
    alignItems: 'center',
    minWidth: 44,
  },
  distance: {
    color: '#3458F6',
    fontWeight: '700',
    fontSize: 12,
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 14,
  },

  // Bottom Info
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
  },
  infoValue: {
    fontWeight: '700',
    fontSize: 15,
    color: '#111',
  },

  // Action Row
  actionRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    left: 15,
    right: 15,
    gap: 10,
    alignItems: 'center',
  },

  // Reject
  rejectBtn: {
    width: 70,
    height: 70,
    backgroundColor: '#ECECEC',
    borderRadius: 14,
    justifyContent: 'center',
    marginBottom:80,
    alignItems: 'center',
    gap: 3,
  },
  rejectCircleOuter: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2.5,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectCircleInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D8D8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
  },
  rejectText: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
    lineHeight: 13,
  },

  // Accept Slider
  acceptBtn: {
    flex: 1,
    height: 70,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 80,
    paddingLeft: THUMB_SIZE + 16,
  },
  acceptTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  acceptSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  acceptThumb: {
    position: 'absolute',
    left: 8,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
});