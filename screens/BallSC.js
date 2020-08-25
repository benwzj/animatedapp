import React, { Component } from 'react';
import { View, Button, Animated, Text, Easing } from 'react-native';

class BallSC extends Component {
  constructor (props) {
    super(props);
    this.position = new Animated.ValueXY(0,0);
    this.state = {valueXY: null};
  }
  startSpring = () => {
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false,
      friction: 1,
      tension: 1,
    }).start();
  }
  startTiming = () =>{
    Animated.timing(this.position, {
      toValue: { x: 100, y: 100 },
      easing: Easing.back(),
      useNativeDriver: false,
      duration: 2000
    }).start();
  }

  getXY = () =>{
    this.setState ({valueXY: JSON.stringify( this.position.getLayout())})
  }

  render() {
    return (
      <View>
        <Animated.View style={this.position.getLayout()}>
          <View style={styles.ball} />
        </Animated.View>
        <Button title='start Spring' onPress={this.startSpring} />
        <Button title='start Timing' onPress={this.startTiming} />
        <Button title='get vauleXY' onPress={this.getXY} />
        <Text>{this.state.valueXY}</Text>
      </View>
    );
  }
}

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 30,
    borderColor: 'green'
  }
};

export default BallSC;
