import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPokemonDetail} from '../redux/actions/appActions';
import {BarChart} from 'react-native-chart-kit';
import styles from '../assets/styles';
import {Dimensions} from 'react-native';
import {SvgUri} from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const PokemonDetail = ({route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const {pokemonDetail, loadingDetail, errorDetail} = useSelector(state => state.app);

  useEffect(() => {
    dispatch(fetchPokemonDetail(id));
  }, [id, dispatch]);

  if (loadingDetail) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0033ff" />
      </View>
    );
  }

  if (errorDetail) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {errorDetail}</Text>
      </View>
    );
  }

  const {
    image,
    name,
    height,
    weight,
    types,
    stats,
    abilities,
    dreamWorldImage,
  } = pokemonDetail || {};

  const statsLabels = stats?.map(stat => stat.name) || [];
  const statsValues = stats?.map(stat => stat.base_stat) || [];

  const handleFlip = () => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setFlipped(!flipped);
    });
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={handleFlip}>
        <View style={[styles.detailImageContainer, {alignItems: 'center'}]}>
          <Animated.View
            style={[
              styles.flipCard,
              frontStyle,
              {position: flipped ? 'absolute' : 'relative'},
            ]}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.detailPokemonImage}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.flipCard,
              backStyle,
              {position: flipped ? 'relative' : 'absolute'},
            ]}>
            <SvgUri
              uri={dreamWorldImage}
              width="150"
              height="150"
              style={styles.detailPokemonImage}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>
        <Text style={styles.detailText}>Name: {name}</Text>
        <Text style={styles.detailText}>Height: {height} cm</Text>
        <Text style={styles.detailText}>Weight: {weight} g</Text>
        <Text style={styles.detailText}>
          Types: {types?.map(type => type).join(', ')}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stats</Text>
        {statsLabels.length > 0 && (
          <ScrollView horizontal>
            <BarChart
              data={{
                labels: statsLabels.map(label =>
                  label.length > 10
                    ? `${label.substring(0, 2)}-${label.substring(8, 9)}`
                    : label.replace(/\b\w/g, char => char.toUpperCase()),
                ),
                datasets: [{data: statsValues}],
              }}
              width={screenWidth - 30}
              height={250}
              fromZero={true}
              showBarTops={true}
              withInnerLines={false}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#e8f1ff',
                backgroundGradientTo: '#d0e8ff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 51, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                paddingRight: 20,
                propsForLabels: {
                  fontSize: 12,
                  fontWeight: 'bold',
                },
                barPercentage: 0.6,
              }}
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 10,
              }}
              renderDotContent={({x, y, index}) => (
                <Text
                  key={index}
                  style={{
                    position: 'absolute',
                    top: y - 20,
                    left: x - 10,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#0033ff',
                  }}>
                  {statsValues[index]}
                </Text>
              )}
            />
          </ScrollView>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Abilities</Text>
        {abilities && abilities.length > 0 ? (
          abilities.map(({name, effect}, index) => (
            <View key={index} style={styles.abilityContainer}>
              <Text style={styles.detailText}>Name: {name}</Text>
              <Text style={styles.detailText}>Description: {effect}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.detailText}>No abilities available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default PokemonDetail;
