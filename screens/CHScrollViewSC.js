import React from 'react'
import { View, Text } from 'react-native'

import CHScrollView from '../components/CHScrollView'

const CHScrollViewSC = () => {
  const fakeScrollItems = () => {
    const fakeData = []
    for ( let i=0; i<20; i++ ){
      fakeData.push (
        <View 
          key = {i} 
          style = {[
            {backgroundColor: i%2 === 0 ? '#b1b1c1' : '#d1d1d8'}, 
            styles.itemContainer
          ]}
        >
          <Text style = {styles.item}>{'Item #' + i}</Text>
        </View>
      )
    }
    return fakeData
  }
  //// run CPU burner for testing
  const runCPUburner = () => {
    const timestamp = Date.now() + 160;
    while(Date.now() < timestamp) {};
    requestAnimationFrame(runCPUburner);
  }
  runCPUburner();

  return (
    <View style={styles.container}>
      <View style={{height:'100%'}}>
        <CHScrollView >
          {fakeScrollItems()}
        </CHScrollView>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  itemContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    fontSize: 30      
  }
};

export default CHScrollViewSC
