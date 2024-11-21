import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  header: {
    backgroundColor: 'rgba(29, 53, 87, 0.8)',
    padding: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pokemonList: {
    padding: 10,
  },
  pokemonCard: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  pokemonName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  toTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  detailPokemonImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0033ff',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
    textTransform: "capitalize"
  },
  chartStyle: {
    marginVertical: 10,
    borderRadius: 8,
  },
  abilityContainer: {
    marginVertical: 8,
  },
  flipCard: {
    backfaceVisibility: 'hidden',
  },
  selectedPokemonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  pokemonSlot: {
    width: '48%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  pokemonImage2: {
    width: 50,
    height: 50,
  },
  pokemonName2: {
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholderText: {
    color: '#888',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dialogContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
  },
});

export default styles;
