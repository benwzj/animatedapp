import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TrackingGesturesSC from './screens/TrackingGesturesSC'
import OpacitySC from './screens/OpacitySC'
import BallSC from './screens/BallSC'
import TimingSC from './screens/TimingSC'
import SpringSC from './screens/SpringSC'
import ParallelSC from './screens/ParallelSC'
import SequenceSC from './screens/SequenceSC'
import StaggerSC from './screens/StaggerSC'
import IndexSC from './screens/IndexSC'
import DeckSC from './screens/DeckSC'

const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Index" 
          component={IndexSC} 
        />
        <Stack.Screen 
          name="Deck" 
          component={DeckSC} 
        />
        <Stack.Screen 
          name="Stagger" 
          component={StaggerSC} 
        />
        <Stack.Screen 
          name="Sequence" 
          component={SequenceSC} 
        />
        <Stack.Screen 
          name="Parallel" 
          component={ParallelSC} 
        />
        <Stack.Screen 
          name="Spring" 
          component={SpringSC} 
        />
        <Stack.Screen 
          name="Timing" 
          component={TimingSC} 
        />
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