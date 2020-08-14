import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TrackingGesturesSC from './screens/TrackingGesturesSC'
import OpacitySC from './screens/OpacitySC'
import BallSC from './screens/BallSC'

const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="TrackingGestures" 
          component={TrackingGesturesSC} 
        />
        <Stack.Screen 
          name="Opacity" 
          component={OpacitySC} 
        />
        <Stack.Screen 
          name="Ball" 
          component={BallSC} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator