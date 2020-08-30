import React from "react";
import { Animated, Text, View, StyleSheet, Button,
         SafeAreaView, Easing } from "react-native";

const OpacitySC = () => {
  const fadeAnim = new Animated.Value(0)

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      timing: Easing.bounce,
      useNativeDriver: false 
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false 
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
    <View >
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim
          }
        ]}
      >
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} />
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
  }
});

export default OpacitySC;