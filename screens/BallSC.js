import React, { Component } from 'react';
import { View, Button, Animated } from 'react-native';

class BallSC extends Component {
  constructor (props) {
    super(props);
    this.position = new Animated.ValueXY(0, 0);

  }
  startMove = () => {
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false
      
    }).start();
  }

  render() {
    return (
      <View>
        <Animated.View style={this.position.getLayout()}>
          <View style={styles.ball} />
        </Animated.View>
        <Button title='start' onPress={this.startMove} />
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
