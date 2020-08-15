import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing,
  Text,
  View,
  Dimensions
} from 'react-native'

const ParallelSC = () => {
  const animatedValue1 = new Animated.Value(0)
  const animatedValue2 = new Animated.Value(0)
  const animatedValue3 = new Animated.Value(0)

  const parallelIt = () =>{
    animatedValue1.setValue(0)
    animatedValue2.setValue(0)
    animatedValue3.setValue(0)
    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(
        value,
        {
          toValue: 1,
          duration,
          easing,
          delay,
          useNativeDriver: false
        }
      )
    }
    Animated.parallel([
      createAnimation(animatedValue1, 2000, Easing.ease),
      createAnimation(animatedValue2, 1000, Easing.ease, 1000),
      createAnimation(animatedValue3, 1000, Easing.ease, 2000)
    ]).start()
  }
  const scaleText = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 2]
  })
  const spinText = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  })
  const introButton = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 500]
  })
  return (
    <TouchableOpacity style={styles.container} onPress = {parallelIt} >
      <Animated.View style={{ transform: [{scale: scaleText}] }}>
        <Text>Welcome</Text>
      </Animated.View>
      <Animated.View style={{ marginTop: 20, transform: [{rotate: spinText}] }}>
        <Text style={{fontSize: 20}}>to the App!</Text>
      </Animated.View>
      <Animated.View style={{top: introButton, position: 'absolute'}}>
        <TouchableHighlight style={styles.button}>
          <Text style={{color: 'black', fontSize: 20}}>My dear friends!</Text>
        </TouchableHighlight>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: Dimensions.get('window').width - 40,
    height: 70,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ParallelSC