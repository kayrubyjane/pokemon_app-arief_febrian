import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPokemonAction, comparePokemon} from '../redux/actions/appActions';
import {BarChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import styles from '../assets/styles';

const screenWidth = Dimensions.get('window').width;

const ComparisonPage = () => {
  const dispatch = useDispatch();
  const {pokemon, compareResult} = useSelector(state => state.app);

  const [selectedPokemon, setSelectedPokemon] = useState([null, null]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchPokemonAction(1302));
  }, [dispatch]);

  useEffect(() => {
    if (selectedPokemon[0] && selectedPokemon[1]) {
      const selectedIds = selectedPokemon.map(pokemon => pokemon.id);
      dispatch(comparePokemon(selectedIds));
    }
  }, [selectedPokemon, dispatch]);

  useEffect(() => {
    if (compareResult.length === 2) {
      console.log('Pokemon 1 Stats:', compareResult[0].stats);
      console.log('Pokemon 2 Stats:', compareResult[1].stats);
    }
  }, [compareResult]);

  const handleSelectPokemon = pokemon => {
    const newSelectedPokemon = [...selectedPokemon];
    newSelectedPokemon[activeSlot] = pokemon;
    setSelectedPokemon(newSelectedPokemon);
    setIsDialogOpen(false);
  };

  const clearSelection = () => {
    setSelectedPokemon([null, null]);
  };

  const filteredPokemon = pokemon?.filter(poke =>
    poke.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const barChartData = {
    labels: ['HP', 'Attack', 'Defense', 'Sp-A', 'Sp-D', 'Speed'],
    datasets: [
      {
        data: compareResult.length
          ? compareResult[0].stats.map(stat => stat.base_stat)
          : [0, 0, 0, 0, 0, 0],
        color: () => 'rgba(54, 162, 235, 1)',
      },
      {
        data: compareResult.length
          ? compareResult[1].stats.map(stat => stat.base_stat)
          : [0, 0, 0, 0, 0, 0],
        color: () => 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedPokemonContainer}>
        {selectedPokemon.map((pokemon, index) => (
          <TouchableOpacity
            key={index}
            style={styles.pokemonSlot}
            onPress={() => {
              setActiveSlot(index);
              setIsDialogOpen(true);
            }}>
            {pokemon ? (
              <>
                <Image
                  source={{uri: pokemon.image}}
                  style={styles.pokemonImage2}
                />
                <Text style={styles.pokemonName2}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Text>
              </>
            ) : (
              <Text style={styles.placeholderText}>Select Pokémon</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {compareResult.length === 2 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Stats Comparison</Text>
          <BarChart
            data={barChartData}
            width={screenWidth - 40}
            height={300}
            fromZero
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
          />
        </View>
      )}

      <Modal visible={isDialogOpen} animationType="slide">
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogTitle}>Choose Pokémon</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Pokémon..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={filteredPokemon?.slice(0, 25)}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelectPokemon(item)}>
                <Image
                  source={{uri: item.image}}
                  style={styles.listItemImage}
                />
                <Text style={styles.listItemText}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={() => setIsDialogOpen(false)} />
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <Button title="Clear Selection" onPress={clearSelection} />
      </View>
    </View>
  );
};

export default ComparisonPage;
