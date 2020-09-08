import React from 'react'
import { View, FlatList, StyleSheet, TouchableHighlight,
  Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TrackingGesturesSC from './screens/TrackingGesturesSC'
import OpacitySC from './screens/OpacitySC'
import BallSC from './screens/BallSC'
import TimingSC from './screens/TimingSC'
import SpringSC from './screens/SpringSC'
import ParallelSC from './screens/ParallelSC'
import SequenceSC from './screens/SequenceSC'
import StaggerSC from './screens/StaggerSC'
import DeckSC from './screens/DeckSC'
import AHScrollViewSC from './screens/AHScrollViewSC'
import CHScrollViewSC from './screens/CHScrollViewSC'
import DraggableReanimatedSC from './screens/DraggableReanimatedSC'
import DraggableSC from './screens/DraggableSC'
import DecaySC from './screens/DecaySC'
import RowActionsSC from './screens/RowActionsSC'
import RowSwipeableSC from './screens/RowSwipeableSC'

const SCREENS = [
  {
    component: TrackingGesturesSC,
    name: 'TrackingGesturesSC',
    title: 'Tracking Gestures'
  },{
    component: OpacitySC,
    name: 'OpacitySC',
    title: 'Opacity'
  },{
    component: BallSC,
    name: 'BallSC',
    title: 'BallSC'
  },{
    component: TimingSC,
    name: 'TimingSC',
    title: 'TimingSC'
  },{
    component: SpringSC,
    name: 'SpringSC',
    title: 'SpringSC '
  },{
    component: ParallelSC,
    name: 'ParallelSC',
    title: 'ParallelSC'
  },{
    component: SequenceSC,
    name: 'SequenceSC',
    title: 'SequenceSC '
  },{
    component: StaggerSC,
    name: 'StaggerSC',
    title: 'StaggerSC'
  },{
    component: DeckSC,
    name: 'DeckSC',
    title: 'DeckSC'
  },{
    component: AHScrollViewSC,
    name: 'AHScrollViewSC',
    title: 'AHScrollViewSC'
  },{
    component: CHScrollViewSC,
    name: 'CHScrollViewSC',
    title: 'CHScrollViewSC'
  },{
    component: DraggableReanimatedSC,
    name: 'DraggableReanimatedSC',
    title: 'DraggableReanimatedSC'
  },{
    component: DraggableSC,
    name: 'DraggableSC',
    title: 'DraggableSC'
  },{
    component: DecaySC,
    name: 'DecaySC',
    title: 'DecaySC'
  },{
    component: RowActionsSC,
    name: 'RowActionsSC',
    title: 'RowActionsSC'
  },{
    component: RowSwipeableSC,
    name: 'RowSwipeableSC',
    title: 'RowSwipeableSC'
  }
]

const Stack = createStackNavigator();

const AppNavigator = () => {
  const exampleScreens = SCREENS.map (screen=>{
    return (
      <Stack.Screen 
        key = {screen.name}
        name = {screen.name}
        component = {screen.component}
        title = {screen.title} 
      />
    )
  })
  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  }
  const IndexSC = ({navigation}) =>{
    return (
      <FlatList
        style = {styles.list}
        data = {SCREENS}
        ItemSeparatorComponent = {ItemSeparator}
        renderItem = {({item, index, separators}) => (
          <TouchableHighlight
            id = {item.name}
            onPress = {() => navigation.navigate (item.name)}
            onShowUnderlay = {separators.highlight}
            onHideUnderlay = {separators.unhighlight}
          >
            <View style = {styles.title}>
              <Text style = {styles.titleText}>{ item.title }</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor = {(item) => item.name}
      />
    );
  }
  const indexScreen = () => <Stack.Screen 
    name = "Index" 
    component = {IndexSC} 
    title = 'Index'
    key = 'Index'
  />
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {[ indexScreen(), ...exampleScreens ]}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  titleText: {
    backgroundColor: 'transparent',
  },
  title: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})

export default AppNavigator