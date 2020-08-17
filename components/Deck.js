import React, {useState} from 'react'
import { 
  View,
  Animated,
  PanResponder,
  Dimensions, 
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform } from 'react-native'
  
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 450;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Deck = (props) => {
  const {data, renderCard, onSwipeRight, onSwipeLeft,renderNoMoreCard} = props;
  const [currentItemIndex, setCurrentItemIndex] = useState (0)
  const position = new Animated.ValueXY(0,0)
  const pan = PanResponder.create ({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) =>{
      position.setValue ({x: gesture.dx, y: gesture.dy})
      //console.log( gesture );
    },
    onPanResponderRelease: (event, gesture) =>{
      if ( gesture.dx > SWIPE_THRESHOLD ){
        forceSwipe ('right')
      }else if ( gesture.dx < -SWIPE_THRESHOLD ){
        forceSwipe ('left')
      }else{
        resetPosition ()
      }
    }
  })
  const forceSwipe = (direction) =>{
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing ( position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false
    }).start ( () => completeSwipe (direction) )
  }
  const resetPosition = () =>{
    Animated.spring ( position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start ()
  }
  const completeSwipe = (direction) =>{
    LayoutAnimation.configureNext (LayoutAnimation.Presets.spring)
    setCurrentItemIndex (index => index+1)
    direction === 'right'? onSwipeRight(): onSwipeLeft()
  }
  const getCardStyle = () =>{
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...position.getLayout(),
      transform: [{rotate}]
    }
  }
  const renderCards = () =>{
    if ( currentItemIndex >= data.length ) {
        return renderNoMoreCard()
    }
    return data.map ( (item, index) => {
      if ( index < currentItemIndex ) { return null }
      if ( index === currentItemIndex ){
        return (
          <Animated.View 
            key = {item.id}
            style = {[getCardStyle(), styles.deckCard]}
            {...pan.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        )
      }
      return (
          <Animated.View 
            key = {item.id}
            style = {{...styles.deckCard, 
                      top: 7*(index - currentItemIndex), 
                      left: 5*(index - currentItemIndex),
                    }}
          >
            {renderCard(item)}
          </Animated.View>
      )
    }).reverse()
  }
  return (
    <View>
      {renderCards()}
    </View>
  );
}

const styles = StyleSheet.create({
  deckCard: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
})

export default Deck
