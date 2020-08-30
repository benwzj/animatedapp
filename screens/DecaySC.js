// compare Decay, Sping, Timing
import React, {useRef}  from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Easing,
  Animated
} from 'react-native'

const DecaySC = () => {
  const decayValue = useRef ( new Animated.Value(0) ).current
  const springValue = useRef ( new Animated.Value(0) ).current
  const timingValue = useRef ( new Animated.Value(0) ).current
  const timingValue1 = useRef ( new Animated.Value(0) ).current
  const decayIt = () =>{
    decayValue.setValue (0)
    Animated.decay (
      decayValue,{
        velocity: 2,
        deceleration: 0.997,
        isInteraction: true,
        useNativeDriver: false
      }
    ).start()
  }
  const springIt = () =>{
    springValue.setValue (0)
    Animated.spring (
      springValue,{
        toValue: 665,
        friction: 1,
        tension: 1,
        useNativeDriver: false
      }
    ).start()
  }
  const timingIt = () =>{
    timingValue.setValue (0)
    Animated.timing (
      timingValue,{
        toValue: 665,
        duration: 1500,
        easing: Easing.bounce,
        useNativeDriver: false
      }
    ).start()
    timingValue1.setValue (0)
    Animated.timing (
      timingValue1,{
        toValue: 665,
        duration: 1500,
        easing: Easing.circle,
        useNativeDriver: false
      }
    ).start()
  }
  const sequenceIt = () =>{
    springIt ()
    decayIt ()
    timingIt ()
  }
  return (
    <TouchableOpacity style={styles.container} onPress = {sequenceIt}>
      <View style={styles.animatedView}>
      <Animated.View 
        style = {[
          styles.ball, {
            transform: [{translateY: decayValue}]
          }
        ]}
      />
      </View>
      <View style={styles.animatedView}>
      <Animated.View 
        style = {[
          styles.ball, {
            transform: [{translateY: springValue}]
          }
        ]}
      />
      </View>
      <View style={styles.animatedView}>
        <Animated.View 
          style = {[
            styles.ball, {
              transform: [{translateY: timingValue}]
            }
          ]}
        />
      </View>
      <View style={styles.animatedView}>
        <Animated.View 
          style = {[
            styles.ball, {
              transform: [{translateY: timingValue1}]
            }
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}

const CIRCLE_SIZE = 70;
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row'
  },
  animatedView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightyellow'
  },
  ball: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'lightblue',
    borderWidth: 1,
  },
})

export default DecaySC