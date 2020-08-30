import React, {useRef}  from 'react'
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  View,
  Animated
} from 'react-native'

const SpringSC = () => {
  const springValue1 = useRef ( new Animated.Value(1) ).current
  const springValue2 = useRef ( new Animated.Value(1) ).current
  const springValue3 = useRef ( new Animated.Value(1) ).current
  const springIt = (value,fric,tens) =>{
    value.setValue (0.3)
    Animated.spring (
      value,
      {
        toValue: 1,
        friction: fric,
        tension: tens,
        useNativeDriver: false
      }
    ).start()
  }
  const sequenceIt = () =>{
    springIt ( springValue1, 7, 40 )
    springIt ( springValue2, 1, 1)
    springIt ( springValue3, 3, 3 )
  }
  return (
    <TouchableOpacity style={styles.container} onPress = {sequenceIt} >
      <Animated.Image 
        style ={{width: 227, height: 200, transform: [{scale: springValue1}]}}
        source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
      />
      <Animated.Image 
        style ={{width: 227, height: 200, transform: [{scale: springValue2}]}}
        source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
      />
      <Animated.Image 
        style ={{width: 227, height: 200, transform: [{scale: springValue3}]}}
        source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SpringSC