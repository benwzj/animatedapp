import React from 'react';
import { StyleSheet, View, Animated, 
  PanResponder } from 'react-native';

export default class DraggableSC extends React.Component {
  constructor(props) {
    super(props);

    this._position = new Animated.ValueXY (0,0)
    this._pan = PanResponder.create ({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this._position.setOffset ({
          x: this._position.x._value,
          y: this._position.y._value
        });
        this._position.setValue ({x: 0, y: 0});
      },
      onPanResponderMove: (event, gesture) =>{
        this._position.setValue ({x: gesture.dx, y: gesture.dy})
      },
      onPanResponderRelease: (event, gesture) =>{
        this._position.flattenOffset();

        // Animated.spring ( this._position, {
        //   toValue: {x: 0, y: 0},
        //   friction: 4,
        //   useNativeDriver: false 
        // }).start ()
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View 
          style = {[
            styles.ball, 
            this._position.getLayout(),
          ]}
          {...this._pan.panHandlers}
        />
      </View>
    );
  }
}

const CIRCLE_SIZE = 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  ball: {
    //position: 'absolute',
    left: 70,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'lightblue',
    borderWidth: 1,
  },
});
