import React from 'react'
import {
  StyleSheet,  View,  Button,  Animated,
  Dimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

const StaggerSC = () => {
  useFocusEffect(
    React.useCallback(() => {
      return () => { 
        Animated.stagger(20, staggerAnimations).stop()
      }
    }, [Animated,staggerAnimations])
  );
  const arr = []
  for (var i = 0; i < 450; i++) {
    arr.push(i)
  }
  const animatedValue = []
  arr.forEach ((value) => {
    animatedValue[value] = new Animated.Value(0)
  })
  const staggerAnimations = arr.map((item) => {
    return Animated.timing(
      animatedValue[item],
      {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false
      }
    )
  })

  let staggerHandler = null
  const StaggerIt = () =>{
    arr.forEach((value) => {
      animatedValue[value].setValue (0)
    })
    staggerHandler = Animated.stagger(20, staggerAnimations)
    staggerHandler.start();
  }
  const StopIt = () =>{
    // arr.forEach((value) => {
    //   animatedValue[value].stopAnimation()
    // })
    staggerHandler && staggerHandler.stop()
  }

  return (
    <View style={styles.container}>
      <View style={styles.button} >
        <Button 
          onPress={StaggerIt} 
          title='Stagger it' 
        />
        <Button 
          onPress={()=>StopIt()} 
          title='Stop it' 
        />
      </View>
      {arr.map((a, i) => {
        return <Animated.View 
          key={i} 
          style={{opacity: animatedValue[a], 
            height: 20, 
            width: 20, 
            backgroundColor: 'red', 
            marginLeft: 3, 
            marginTop: 3}}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: {
    flexDirection: 'row',
    height: 40,
    width: Dimensions.get('window').width,
    alignItems: 'center'
  }
})

export default StaggerSC