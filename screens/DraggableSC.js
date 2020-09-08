import React from 'react';
import { StyleSheet, View, Animated, Image,
       PanResponder } from 'react-native';
import imageSource from '../assets/headerImg.png'

export default class DraggableSC extends React.Component {
  constructor(props) {
    super(props);

    this._position1 = new Animated.ValueXY (0,0)
    this._position2 = new Animated.ValueXY (0,0)
    this._position3 = new Animated.ValueXY (0,0)

    this._pan1 = PanResponder.create ({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this._position1.setOffset ({
          x: this._position1.x._value,
          y: this._position1.y._value
        });
        this._position1.setValue ({x: 0, y: 0});
      },
      onPanResponderMove: (event,gesture) =>{
        this._position1.setValue ({x: gesture.dx, y: gesture.dy})
      },
      onPanResponderRelease: () =>{
        this._position1.flattenOffset();
      }
    })

    this._pan2 = PanResponder.create ({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this._position2.setOffset ({
          x: this._position2.x._value,
          y: this._position2.y._value
        });
        this._position2.setValue ({x: 0, y: 0});
      },
      onPanResponderMove: (event, gesture) =>{
        this._position2.setValue ({x: gesture.dx, y:0})
      },
      onPanResponderRelease: (event, gesture) =>{
        this._position2.flattenOffset();

        Animated.spring ( this._position2, {
          toValue: {x: 0, y: 0},
          friction: 4,
          useNativeDriver: false 
        }).start ()
      }
    })

    this._pan3 = PanResponder.create ({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this._position3.setOffset ({
          x: this._position3.x._value,
          y: this._position3.y._value
        });
        this._position3.setValue ({x: 0, y: 0});
      },
      onPanResponderMove: (event, gesture) =>{
        this._position3.setValue ({x: gesture.dx, y: gesture.dy})
      },
      onPanResponderRelease: (event, gesture) =>{
        this._position3.flattenOffset();

        Animated.spring ( this._position3, {
          toValue: {x: 0, y: 0},
          friction: 4,
          useNativeDriver: false 
        }).start ()
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View 
          style = {[
            {backgroundColor: 'limegreen'},
            styles.ball, 
            this._position1.getLayout(),
          ]}
          {...this._pan1.panHandlers}
        >
          <Image source = {imageSource} style={styles.image} />
        </Animated.View>
        <Animated.View 
          style = {[
            {backgroundColor: 'coral'},
            styles.ball, 
            this._position2.getLayout(),
          ]}
          {...this._pan2.panHandlers}
        />
        <Animated.View 
          style = {[
            {backgroundColor: 'skyblue'},
            styles.ball, 
            this._position3.getLayout(),
          ]}
          {...this._pan3.panHandlers}
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
    left: 70,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    width: '100%',
    
  }
});
