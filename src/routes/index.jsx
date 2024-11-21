import React from 'react';
import {Home, Comparison, PokemonDetail} from '../pages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitle: 'PokeApp - Arief Febrian',
        tabBarInactiveTintColor: '#cccfff',
        tabBarActiveTintColor: '#679AFD',
        tabBarShowLabel: false
      }}>
      <BottomTab.Screen
        name="Main"
        component={MainApp}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
      />
      <BottomTab.Screen name="Comparison" component={Comparison} options={{
          tabBarIcon: ({color}) => (
            <Icon name="compare" size={30} color={color} />
          ),
        }} />
    </BottomTab.Navigator>
  );
};

export default Router;
