import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProviderBanco from './provider/ProviderBanco';
import Home from './page/Home';
import Transferencias from './page/Transferencias';
import Historial from './page/Historial';

const Tab = createBottomTabNavigator();

const Navegacion = () => {
  return (
    <ProviderBanco>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Inicio" component={Home} />
          <Tab.Screen name="Transferencias" component={Transferencias} />
          <Tab.Screen name="Historial" component={Historial} />
        </Tab.Navigator>
      </NavigationContainer>
    </ProviderBanco>
  );
};

export default Navegacion;