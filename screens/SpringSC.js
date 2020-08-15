import React, {useRef}  from 'react'
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  View,
  Animated
} from 'react-native'

const SpringSC = () => {
  const springValue = useRef ( new Animated.Value(0) ).current
  const springIt = () =>{
    springValue.setValue (0.3)
    Animated.spring (
      springValue,
      {
        toValue: 1,
        friction: 1,
        tension: 1,
        useNativeDriver: false
      }
    ).start()
  }
  return (
    <TouchableOpacity style={styles.container} onPress = {springIt} >
      <Button 
        style={{marginBottom: 100}} 
        onPress={springIt} 
        title='spring it' 
      />
      <Animated.Image 
        style ={{width: 227, height: 200, transform: [{scale: springValue}]}}
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