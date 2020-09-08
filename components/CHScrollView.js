// Collapsable Header ScrollView
import React from 'react'
import { View, Animated, Dimensions, StyleSheet, 
       ScrollView } from 'react-native'
import imageSource from '../assets/headerImg.png'

const SCREEN_WIDTH = Dimensions.get('window').width
const IMAGE_HEIGHT = 180
const NAVBAR_HEIGHT = 80

const CHScrollView = (props) => {
  const scrollY = new Animated.Value (0)
  const translateY = scrollY.interpolate ({
    // inputRange: [0, IMAGE_HEIGHT-NAVBAR_HEIGHT, IMAGE_HEIGHT],
    // outputRange: [0, 0, NAVBAR_HEIGHT]
    inputRange: [-2, 0, IMAGE_HEIGHT-NAVBAR_HEIGHT, IMAGE_HEIGHT],
    outputRange: [-1, 0, 0, NAVBAR_HEIGHT]
  }) 
  const scale = scrollY.interpolate ({
    inputRange: [-180, 0, 1],
    outputRange: [2, 1, 1]
  })
  const headerStyle = {
    transform: [{translateY},{scale}]
  }


  //const imageSoruce = require('../assets/headerImg.png')
  return (
    <View style = {styles.container}>
      <Animated.ScrollView 
        style = {{flex:1, width:SCREEN_WIDTH}} 
        onScroll = { Animated.event (
          [{ nativeEvent: { 
            contentOffset: { y: scrollY } } 
          }],
          {useNativeDriver: true}
        ) }
      >
        <Animated.Image 
          style = {[styles.image, headerStyle]}
          source = {imageSource}
        />
        { props.children }
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    zIndex: 2,
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT
  },
  scroll: {
    height: '100%',
    width: '100%',
  }
})

export default CHScrollView
