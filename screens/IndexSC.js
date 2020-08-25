import React from 'react'
import { View, Button } from 'react-native'

const IndexSC = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        title= "Opaciey Screen"
        onPress={() => navigation.push('Opacity')}
      />
      <Button
        title= "Stagger Screen"
        onPress={() => navigation.push('Stagger')}
      />
      <Button
        title= "Sequence Screen"
        onPress={() => navigation.push('Sequence')}
      />
      <Button
        title= "Parallel Screen"
        onPress={() => navigation.push('Parallel')}
      />
      <Button
        title= "Spring Screen"
        onPress={() => navigation.push('Spring')}
      />
      <Button
        title= "Timing Screen"
        onPress={() => navigation.push('Timing')}
      />
      <Button
        title= "TrackingGestures Screen"
        onPress={() => navigation.push('TrackingGestures')}
      />
      <Button
        title= "Ball Screen"
        onPress={() => navigation.push('Ball')}
      />
      <Button
        title= "Deck Screen"
        onPress={() => navigation.push('Deck')}
      />
      <Button
        title= "AHScrollView Screen"
        onPress={() => navigation.push('AHScrollView')}
      />
      <Button
        title= "Renaimated Screen"
        onPress={() => navigation.push('Reanimated')}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  }
};

export default IndexSC
