import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const VEHICLES = [
  {
    id: '1',
    label: 'Motorcycle',
    image: require('../../assets/images/motorcycle.png'),
  },
  {
    id: '2',
    label: 'Bicycle',
    image: require('../../assets/images/bicycle.png'),
  },
  {
    id: '3',
    label: 'Electric Scooter',
    image: require('../../assets/images/scooter.png'),
  },
];

const ChooseVehicleScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string>('');

  const handleNext = () => {
    if (selected) {
      navigation.navigate('VehicleInfo' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Icon name="chevron-left" size={26} color="#2F5BFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select vehicle</Text>
      </View>

      <FlatList
        data={VEHICLES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => {
          const isSelected = selected === item.id;
          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setSelected(item.id)}
              style={[
                styles.card,
                isSelected && styles.cardSelected,
              ]}>
              <ImageBackground
                source={item.image}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}>

                {/* Dark overlay */}
                <View style={styles.overlay} />

                {/* Label */}
                <Text style={styles.cardLabel}>{item.label}</Text>

                {/* Radio button */}
                <View style={[
                  styles.radio,
                  isSelected && styles.radioSelected,
                ]}>
                  {isSelected && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />

      {/* Next Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selected && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!selected}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseVehicleScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: {marginRight: 8},
  headerTitle: {fontSize: 20, fontWeight: '700', color: '#111'},
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
    gap: 14,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#2F5BFF',
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 14,
  },
  cardImageStyle: {
    borderRadius: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: 14,
  },
  cardLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  radio: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#2F5BFF',
    backgroundColor: '#fff',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2F5BFF',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
  },
  nextButton: {
    backgroundColor: '#2F5BFF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  nextButtonDisabled: {backgroundColor: '#bbb', elevation: 0},
  nextButtonText: {color: '#fff', fontSize: 16, fontWeight: '700'},
});