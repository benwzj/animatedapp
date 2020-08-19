import React, { Component } from 'react';
import { View, Button, Animated, Text } from 'react-native';

class BallSC extends Component {
  constructor (props) {
    super(props);
    this.position = new Animated.ValueXY(0, 0);
    this.state = {valueXY: null};
  }
  startMove = () => {
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false
      
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
        <Button title='start' onPress={this.startMove} />
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
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'green'
  }
};

export default BallSC;
