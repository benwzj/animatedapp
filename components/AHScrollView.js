// AnimatedHeader ScrollView
import React from 'react'
import { 
  View,
  Animated,
  PanResponder,
  Dimensions, 
  StyleSheet } from 'react-native'
  
const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 100

const AHScrollView = () => {
  const scrollY = new Animated.Value (0)
  const pan = PanResponder.create ({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) =>{
      scrollY.setValue (gesture.dy)
    },
    onPanResponderRelease: () =>{
      resetPosition ()
    }
  })
  const resetPosition = () =>{
    Animated.spring ( scrollY, {
      toValue: 0,
      useNativeDriver: false
    }).start ()
  }

  const getImgTransFormStyle = () =>{
    const standardRange = scrollY.interpolate({
      inputRange: [0, SWIPE_THRESHOLD],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })
    return {
      transform: [
        { translateY: standardRange.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
          })
        },{
          translateX: standardRange.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -150],
          })
        },{
          scale: standardRange.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.5],
          }),
        },
      ]
    };
  }
  const getTextTransFormStyle = () =>{
    const standardRange = scrollY.interpolate({
      inputRange: [0, SWIPE_THRESHOLD],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })
    return {
      transform: [
        { translateY: standardRange.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50],
          })
        },{
          translateX: standardRange.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -100],
          })
        },{
          scale: standardRange.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.5],
          }),
        },
      ]
    };
  }
  const animatedText = () =>{
    return (
      <Animated.Text 
        style = {[{fontSize:40},getTextTransFormStyle()]}
      >
        This is Animated Text
      </Animated.Text>
    )  
  }  
  const animatedImage = () =>{
    return (
      <Animated.Image 
        style = {getImgTransFormStyle()}
        source = {require('../img/dog.png')} 
      />
    )  
  }

  return (
    <View 
      style={styles.container} 
      {...pan.panHandlers}
    >
      {animatedText ()}
      {animatedImage ()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    width: SCREEN_WIDTH,
    height: 350
  }
})

export default AHScrollView
