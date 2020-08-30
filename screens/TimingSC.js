import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
  Button
} from 'react-native'

class TimingSC extends Component {
  constructor () {
    super()
    this.windowWidth = Dimensions.get('window').width
    this.animatedValue = new Animated.Value(0)
    this.state = { isRunning: false }
    this.isRunning = false;
  }
  componentDidMount () {
    this.setState ({isRunning: true})
    this.isRunning = true;
    this.animate()
  }
  stopOrStart () {
    //console.log ( 'this.animatedValue' ,this.animatedValue)
    if ( this.state.isRunning ){
      this.setState ({isRunning: false})
      this.isRunning = false;
      this.animatedValue.stopAnimation()
    }else{
      this.setState ({isRunning: true})
      this.isRunning = true;
      this.animate ()
    }
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
    ).start(() => {
      if ( this.isRunning ){
        this.animate()
      }
    })
    // Animated.loop(
    //   Animated.timing(
    //     this.animatedValue,
    //     {
    //       toValue: 1,
    //       duration: 3000,
    //       easing: Easing.quad,
    //       useNativeDriver: false
    //     }
    //   ),
    //   {
    //     iterations: -1
    //   }
    // ).start()
  }
  render () {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, this.windowWidth-40, 0]
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
        <Button 
          title = {this.state.isRunning ? 'stop them': 'start them'}
          onPress = {this.stopOrStart.bind(this)} 
        />
        <Animated.View
          style={{
            marginTop: 50,
            marginLeft,
            height: 30,
            width: 40,
            backgroundColor: 'red'}} />
        <Animated.View
          style={{
            marginLeft: movingMargin,
            marginTop: 30,
            height: 30,
            width: 40,
            opacity,
            backgroundColor: 'blue'}} />        

        <Animated.Text
          style={{
            fontSize: textSize,
            marginTop: 30,
            color: 'green'}} >
            Text fontSize is changing!
        </Animated.Text>
        <Animated.View
          style={{
            transform: [{rotateX}],
            marginTop: 50,
            height: 30,
            width: 350,
            backgroundColor: 'blue'}}>
          <Text style={{color: 'white', fontSize: 25}}>
            Animated View is rotating by X
          </Text>
        </Animated.View>
        <Animated.Image
          style={{ 
            marginTop: 50,
            width: 227, 
            height: 200, 
            transform: [{rotate: spin}] 
          }}
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
