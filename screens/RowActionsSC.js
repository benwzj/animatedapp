import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions,
  SafeAreaView, ScrollView, Button, Switch} from 'react-native'
import Animated from 'react-native-reanimated'

import Interactable from '../components/Interactable'
import CFlatlist from '../components/CFlatlist'

const Screen = Dimensions.get('window');
const isTestScrollView = false

const RowActionsSC = () => {
  if ( isTestScrollView ){
    return (
      <SafeAreaView style = {styles.container} >
        <ScrollView>
          <Button title={'Button Test'} onPress={()=>console.log('working')} />
          <View style={{ alignItems: 'center'}}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor= {"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=>{}}
            />
          </View>
          <Item item={DATA[0]} />
        </ScrollView>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <CFlatlist
        data = {DATA}
        renderItem = {renderItem}
        keyExtractor = {(item) => item.id}
      />
    </SafeAreaView>
  )
}
const renderItem = ({ item, index, separators }) => {
  console.log( 'item: ', item.title, item.description)
  return (
    <Item
      item = {item}
      onPress = {() => deleteCalendar(item.id)}
      separators = {separators}
      index = {index}
    />
  );
};

const Item = ({ item, onPress, style, separators }) =>{
  return (
    <View style={styles.container}>
      <Row damping={0.3} tension={300}>
        <View style={styles.rowContent}>
          <View style={styles.rowIcon} />
          <View>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowSubtitle}>
              {item.description}
            </Text>
          </View>
        </View>
      </Row>
    </View>
  )
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }
  render() {
    return (
      <View style={{ backgroundColor: '#ceced2' }}>
        <View
          style={{ position: 'absolute', left: 0, right: 0, height: 75 }}
          pointerEvents="box-none"
        >
          <Animated.View
            style={[
              styles.trashHolder,
              {
                transform: [
                  {
                    translateX: this._deltaX.interpolate({
                      inputRange: [-155, 0],
                      outputRange: [0, 155],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity
              onPress={this.onButtonPress.bind(this, 'trash')}
              style={styles.button}>
              <Image
                style={styles.button}
                source={require('../assets/icon-trash.png')}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.snoozeHolder,
              {
                transform: [
                  {
                    translateX: this._deltaX.interpolate({
                      inputRange: [-155, 0],
                      outputRange: [0, 78],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity
              onPress={this.onButtonPress.bind(this, 'snooze')}
              style={styles.button}>
              <Image
                style={styles.button}
                source={require('../assets/icon-clock.png')}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View
          style={{ position: 'absolute', left: 0, right: 0, height: 75 }}
          pointerEvents="box-none">
          <Animated.View
            style={[
              styles.doneHolder,
              {
                transform: [
                  {
                    translateX: this._deltaX.interpolate({
                      inputRange: [0, 78],
                      outputRange: [-78, 0],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity
              onPress={this.onButtonPress.bind(this, 'done')}
              style={styles.button}>
              <Image
                style={styles.button}
                source={require('../assets/icon-check.png')}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[
            {
              x: 78,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
            {
              x: 0,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
            {
              x: -155,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
          ]}
          animatedValueX={this._deltaX}>
          <View
            style={{ left: 0, right: 0, height: 75, backgroundColor: 'white' }}>
            {this.props.children}
          </View>
        </Interactable.View>
      </View>
    );
  }
  onButtonPress(name) {
    alert(`Button ${name} pressed`);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  rowIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#73d4e3',
    margin: 20,
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowSubtitle: {
    fontSize: 18,
    color: 'gray',
  },
  button: {
    width: 40,
    height: 40,
  },
  trashHolder: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 155,
    width: Screen.width,
    height: 75,
    paddingLeft: 18,
    backgroundColor: '#f8a024',
    justifyContent: 'center',
  },
  snoozeHolder: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 78,
    width: Screen.width,
    height: 75,
    paddingLeft: 18,
    backgroundColor: '#4f7db0',
    justifyContent: 'center',
  },
  doneHolder: {
    position: 'absolute',
    top: 0,
    right: Screen.width - 78,
    width: Screen.width,
    height: 75,
    paddingRight: 18,
    backgroundColor: '#2f9a5d',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  playground: {
    marginTop: Screen.height <= 500 ? 0 : 80,
    padding: 20,
    width: Screen.width - 40,
    backgroundColor: '#5894f3',
    alignItems: 'stretch',
    alignSelf: 'center',
  },
  playgroundLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
  },
})
const DATA = [
  {
    id: '01',
    title: 'title1',
    description: 'more detail samples1'
  },{
    id: '02',
    title: 'title2',
    description: 'more detail samples2'
  },{
    id: '03',
    title: 'title3',
    description: 'more detail samples3'
  },{
    id: '04',
    title: 'title4',
    description: 'more detail samples4'
  },{
    id: '05',
    title: 'title5',
    description: 'more detail samples1'
  },{
    id: '06',
    title: 'title6',
    description: 'more detail samples2'
  },{
    id: '07',
    title: 'title7',
    description: 'more detail samples3'
  },{
    id: '08',
    title: 'title8',
    description: 'more detail samples4'
  },{
    id: '09',
    title: 'title9',
    description: 'more detail samples1'
  },{
    id: '010',
    title: 'title10',
    description: 'more detail samples2'
  },{
    id: '011',
    title: 'title11',
    description: 'more detail samples3'
  },{
    id: '012',
    title: 'title12',
    description: 'more detail samples4'
  }
]
export default RowActionsSC