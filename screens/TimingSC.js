import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions
} from 'react-native'

class TimingSC extends Component {
  constructor () {
    super()
    this.windowWidth = Dimensions.get('window').width
    this.animatedValue = new Animated.Value(0)
  }
  componentDidMount () {
    this.animate()
  }
  
  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.quad,
        useNativeDriver: false
      }
    ).start(() => this.animate())
  }
  render () {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.windowWidth-40]
    })
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, this.windowWidth-40, 0]
    })
    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    })
    const rotateX = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '180deg', '0deg']
    })
    const spin = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            marginLeft,
            height: 30,
            width: 40,
            backgroundColor: 'red'}} />
        <Animated.View
          style={{
            marginLeft: movingMargin,
            marginTop: 10,
            height: 30,
            width: 40,
            backgroundColor: 'orange'}} />        
        <Animated.View
          style={{
            opacity,
            marginTop: 10,
            height: 30,
            width: 40,
            backgroundColor: 'blue'}} />
        <Animated.Text
          style={{
            fontSize: textSize,
            marginTop: 10,
            color: 'green'}} >
            Animated Text!
        </Animated.Text>
        <Animated.View
          style={{
            transform: [{rotateX}],
            marginTop: 50,
            height: 30,
            width: 200,
            backgroundColor: 'black'}}>
          <Text style={{color: 'white'}}>Hello from TransformX</Text>
        </Animated.View>
        <Animated.Image
          style={{ width: 227, height: 200, transform: [{rotate: spin}] }}
          source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150
  }
})

export default TimingSC