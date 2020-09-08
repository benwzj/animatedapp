import React from 'react'
import { StyleSheet, View, Text,Button, ScrollView,Switch,
  SafeAreaView, I18nManager, Animated } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler';

import CFlatlist from '../components/CFlatlist'

const isTestScrollView = false

const RowSwipeableSC = () => {
  if ( isTestScrollView ){
    return (
      <SafeAreaView style = {styles.container} >
        <ScrollView>
          <Button title={'Button test'} onPress={()=>console.log('working')} />
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
  return (
    <Item
      item = {item}
      separators = {separators}
      index = {index}
    />
  );
};

const Item = ({ item, index }) => {
  return (
    <AppleStyleSwipeableRow>
      <Row item={item} />
    </AppleStyleSwipeableRow>
  )
};

const Row = ({ item }) => (
  <RectButton style={styles.rectButton} onPress={() => alert(item.title)}>
    <Text style={styles.fromText}>{item.title}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {item.description}
    </Text>
    <Text style={styles.dateText}>
      {item.id} {'❭'}
    </Text>
  </RectButton>
);

class AppleStyleSwipeableRow extends React.Component {
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };
  renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      alert(text);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };
  renderRightActions = progress => (
    <View style={{ width: 192, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
      {/* {this.renderRightAction('More', '#C8C7CD', 192, progress)} */}
      {this.renderRightAction('Flag', '#ffab00', 128, progress)}
      {this.renderRightAction('More', '#dd2c00', 64, progress)}
    </View>
  );
  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
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
export default RowSwipeableSC