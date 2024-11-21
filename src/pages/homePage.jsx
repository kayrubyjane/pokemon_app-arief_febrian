import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPokemonAction} from '../redux/actions/appActions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../assets/styles';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {pokemon, loading} = useSelector(state => state.app);
  const [limit, setLimit] = useState(25);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  let flatListRef = null;

  useEffect(() => {
    if (isLoadingMore || limit === 25) {
      dispatch(fetchPokemonAction(limit)).finally(() => setIsLoadingMore(false));
    }
  }, [limit, dispatch]);

  const loadMorePokemon = () => {
    if (!loading) {
      setIsLoadingMore(true);
      setLimit(limit + 25);
    }
  };

  const render = ({item}) => (
    <TouchableOpacity
      style={styles.pokemonCard}
      onPress={() => navigation.navigate('PokemonDetail', {id: item.id})}>
      <Image source={{uri: item.image}} style={styles.pokemonImage} />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footer}>
        <Text style={styles.loadingText}>Loading More Data...</Text>
      </View>
    );
  };

  const scrollToTop = () => {
    flatListRef.scrollToOffset({animated: true, offset: 0});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
      </View>
      <FlatList
        ref={ref => (flatListRef = ref)}
        data={pokemon}
        keyExtractor={item => item.id.toString()}
        renderItem={render}
        numColumns={3}
        contentContainerStyle={styles.pokemonList}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
      {limit > 25 && (
        <TouchableOpacity style={styles.toTopButton} onPress={scrollToTop}>
          <Icon name="arrow-up-bold-circle" size={50} color="#0033ff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomePage;
