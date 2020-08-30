// AnimatedHeader ScrollView
import React from 'react'
import { 
  View,
  Text,
  Animated,
  Dimensions, 
  StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
  
//const SCREEN_WIDTH = Dimensions.get('window').width
const SCROLL_THRESHOLD = 200

const AHScrollView = (props) => {
  const scrollY = new Animated.Value (0)
  const resetPosition = () =>{
    Animated.spring ( scrollY, {
      toValue: 0,
      useNativeDriver: false
    }).start ()
  }

  const standardRange = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const animatedBackground = () =>{
    return (
      <Animated.View 
        style = {[
          styles.headerBackground, 
          {
            zIndex: 2,
            height: standardRange.interpolate({
              inputRange: [0, 1],
              outputRange: [200, 100]})
          },
        ]}
      />
    )  
  } 
  const animatedText = () =>{
    return (
      <Animated.Text 
        style = {[
          {fontSize:40},
          {
            zIndex: 2,
            opacity: standardRange.interpolate({
              inputRange: [0,0.9,1],
              outputRange: [1,0,1]
            }),
            transform: [
              { translateY: standardRange.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 40],
                })
              },{
                translateX: standardRange.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                })
              },{
                scale: standardRange.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.5],
                })
              }
            ]
          }
        ]}
      >
        This is Animated Text
      </Animated.Text>
    )  
  }  
  const animatedImage = () =>{
    return (
      <Animated.Image 
        style = {{
          zIndex: 2,
          transform: [
            { translateY: standardRange.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -80],
              })
            },{
              translateX: standardRange.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -170],
              })
            },{
              scale: standardRange.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.3],
              })
            }
          ]
        }}
        source = {require('../img/dog.png')} 
      />
    )  
  }
  const getScrollStyle = () =>{
    return {
      zIndex: 1,
      transform: [{
        translateY: standardRange.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -200],
        })
      }]
    }
  }
  return (
    <View style={styles.container}>
      {/* <View 
        style = {styles.headerContainer} 
      > */}
        {animatedBackground ()}
        {animatedText ()}
        {animatedImage ()}
      {/* </View> */}
      <Animated.View 
        style = {[styles.scrollContainer, getScrollStyle()]}
      >
        <ScrollView 
          style = {styles.scroll}
          onScroll = {({nativeEvent}) => {
            if ( nativeEvent.contentOffset.y > SCROLL_THRESHOLD ){
              scrollY.setValue (SCROLL_THRESHOLD)
            }else {
              if ( nativeEvent.contentOffset.y < 0 ){// this code smoose the move!
                resetPosition (); 
              }else{ 
                scrollY.setValue ( nativeEvent.contentOffset.y )
              }
            } 
          }}
          scrollEventThrottle = {10}
          //onLayout = {(event)=> {console.log(event)}}
        >
          { props.children }
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
    height: 200,
    //zIndex: 2,
  },
  headerBackground: {  
    position: 'absolute',     
    //height: 200,
    width: '100%',
    backgroundColor: 'white'
  },
  scrollContainer: {
    //flex: 1,
    position: 'absolute', 
    top: 200,
    height: '100%',
    //height: 500,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'pink', // for test
    
  },
  scroll: {
    height: '100%',
    width: '100%',
  }
})

export default AHScrollView
