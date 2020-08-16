import React from 'react'
import { 
  View,
  Animated,
  PanResponder } from 'react-native'

const Deck = (props) => {
  const position = new Animated.ValueXY(0,0)
  const pan = PanResponder.create ({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) =>{
      position.setValue ({x: gesture.dx, y: gesture.dy})
      //console.log( gesture );
    },
    onPanResponderRelease: () =>{}
  })
  const renderCards = () =>{
    return props.data.map (item => {
      return props.renderCard (item)
    })
  }
  return (
    <Animated.View 
      style = {{...position.getLayout(),transform: [{rotate:'45deg'}]}}
      {...pan.panHandlers}
    >
      {renderCards()}
    </Animated.View>
  );
}

export default Deck
