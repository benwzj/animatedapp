import React from 'react'
import { View, Text, Button, Image } from 'react-native'
//import { Card, Button } from 'react-native-elements'
import Card from '../components/CCard'

import Deck from '../components/Deck'

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://images.unsplash.com/photo-1597263882014-93d07afa273f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'https://images.unsplash.com/photo-1552772171-f6cecaa8f533?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60' },
  { id: 4, text: 'Card #4', uri: 'https://images.unsplash.com/photo-1597025459688-90cfbe52f8e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' },
  { id: 5, text: 'Card #5', uri: 'https://images.unsplash.com/photo-1598104903602-e236fc23b636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1255&q=80' },
  { id: 6, text: 'Card #6', uri: 'https://images.unsplash.com/photo-1595797284406-d7c44faafd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=932&q=80' },
  { id: 7, text: 'Card #7', uri: 'https://images.unsplash.com/photo-1597256122603-a73052ef2f0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' },
  { id: 8, text: 'Card #8', uri: 'https://images.unsplash.com/photo-1597226144169-5748e0f0e706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' },
]

const DeckSC = () => {
  const renderCard = (item) =>{
    return (
      <Card key = {item.id} style={styles.card}>
        <Image source={{uri: item.uri}} style={styles.image} />
        <Text>{item.text}</Text>
        <Text>Some Description will display here</Text>
        <Button
          title = "View Now!"
        />
      </Card>
    ) 
  }
  const swipeLeftHandler = (index) =>{
    console.log( index )
  }

  const wrapperFuncArgu = { currIndex: 0 }
  const swipeRightHandlerWrapper = (argu) =>{
    return (index) => swipeRightHandler (index,argu)
  }
  const swipeRightHandler = (index, argu) => {
    argu.currIndex = index
    console.log( 'this is swipe right!',index , argu)
  }
  const renderNoMoreCard = () =>{
    return (
      <Card title="All Done!">
        <Text style={{ marginBottom: 10 }}>
          There's no more content here!
        </Text>
        <Button
          backgroundColor="#03A9F4"
          title="Get more!"
        />
        <Button
          title="Start again!"
        />
      </Card>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.DeckContainer}>
        <Deck 
          data = {DATA}
          renderCard = {renderCard}
          onSwipeRight = {swipeRightHandlerWrapper(wrapperFuncArgu)}
          onSwipeLeft = {swipeLeftHandler}
          //renderNoMoreCard = {renderNoMoreCard}
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  DeckContainer: {
    height: 600
  },
  card: {
    margin: 10,
    padding: 0,//5,
    alignItems: 'center'
  },
  image: {
    height: 500,
    width: '100%',
  }
};

export default DeckSC
