import React  from 'react'
import {
  StyleSheet,
  View,
  Button,
  Animated,
  Dimensions
} from 'react-native'

import matrix from '../utils/matrix'

const N = 17

const SequenceSC = () => {
  const arr = []
  for (let i = 0; i < N*N; i++) {
    arr.push(i)
  }
  const animatedValue = []
  arr.forEach((value) => {
    animatedValue[value] = new Animated.Value(1)
  })
  let sequenceHandler = null
  const SequenceIt = () =>{
    const animatedSpringArr = animatedValue.map ((value)=>{
      return Animated.spring (value,{
        toValue: 0,
        friction: 1,
        tension: 1,
        useNativeDriver: false
      })  
    })
    const animatedTimingArr = []
    const matrixArr = matrix (N)
    let index = 0
    for ( let i=0; i<N; i++){
      for ( let j=0; j<N; j++ ){
        index = i*N+j
        animatedTimingArr[matrixArr[i][j]] = Animated.timing (
          animatedValue[index],
          {
            toValue: 1,
            duration: 50,
            useNativeDriver: false
          }
        )
      }
    }
    // Animated.parallel(animatedStringArr).start(
    //   ()=> Animated.sequence(animatedTimingArr).start()
    // )
    const animatedArr = [Animated.parallel(animatedSpringArr), ...animatedTimingArr];
    sequenceHandler = Animated.sequence (animatedArr)
    sequenceHandler.start()
  }
  const stopSqeuence = () =>{
    sequenceHandler && sequenceHandler.stop();
  }

  const animatedViewArr = arr.map((a, i) => {
    return (
      <Animated.View 
        key = {i} 
        style = {{opacity: animatedValue[a], 
          height: 20, 
          width: 20, 
          backgroundColor: 'red',
          marginLeft: 3, 
          marginTop: 3
        }} 
      />)
  })

  return (
    <View style={styles.container}>
      <View style={styles.button} >
        <Button 
          onPress={SequenceIt} 
          title='Sequence it' 
        />
        <Button 
          onPress={stopSqeuence} 
          title='Stop it' 
        />
      </View>
      <View style={styles.sequenceArea}>
        {animatedViewArr}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  sequenceArea: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 400,
    height: 400
  },
  button: {
    flexDirection: 'row',
    height: 40,
    width: Dimensions.get('window').width,
    alignItems: 'center'
  }
})

export default SequenceSC