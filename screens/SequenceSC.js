import React  from 'react'
import {
  StyleSheet,
  View,
  Button,
  Animated,
  Dimensions
} from 'react-native'

const SequenceSC = () => {
  const arr = []
  for (var i = 0; i < 400; i++) {
    arr.push(i)
  }
  const animatedValue = []
  arr.forEach((value) => {
    animatedValue[value] = new Animated.Value(0)
  })
  const SequenceIt = () =>{
    arr.forEach((value) => {
      animatedValue[value].setValue (0)
    })
    const animations = arr.map((item) => {
      return Animated.timing(
        animatedValue[item],
        {
          toValue: 1,
          duration: 50,
          useNativeDriver: false
        }
      )
    })
    Animated.sequence(animations).start()
  }

  const animations = arr.map((a, i) => {
    return (
      <Animated.View 
        key={i} 
        style={{opacity: animatedValue[a], 
          height: 20, 
          width: 20, 
          backgroundColor: 'red',
          marginLeft: 3, 
          marginTop: 3}} 
      />)
  })

  return (
    <View style={styles.container}>
      <View style={styles.button} >
        <Button 
          onPress={SequenceIt} 
          title='Sequence it' 
        />
      </View>
      {animations}
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

export default SequenceSC