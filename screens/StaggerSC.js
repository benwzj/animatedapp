import React from 'react'
import {
  StyleSheet,
  View,
  Button,
  Animated,
  Dimensions
} from 'react-native'

const StaggerSC = () => {
  const arr = []
  for (var i = 0; i < 400; i++) {
    arr.push(i)
  }
  const animatedValue = []
  arr.forEach((value) => {
    animatedValue[value] = new Animated.Value(0)
  })
  const StaggerIt = () =>{
    arr.forEach((value) => {
      animatedValue[value].setValue (0)
    })
    const animations = arr.map((item) => {
      return Animated.timing(
        animatedValue[item],
        {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false
        }
      )
    })
    Animated.stagger(10, animations).start()
  }

  return (
    <View style={styles.container}>
      <View style={styles.button} >
        <Button 
          onPress={StaggerIt} 
          title='Stagger it' 
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
    height: 40,
    width: Dimensions.get('window').width,
    alignItems: 'center'
  }
})

export default StaggerSC