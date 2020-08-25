import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TEXT_CHANGE = 'TEXT_CHANGE';
const TEXT_BLUR = 'TEXT_BLUR';

const inputReducer = (state, action) => {
  const { type, payload } = action;
  //console.log( 'Cinput Reducer', action);
  switch ( type ){ 
    case TEXT_CHANGE:
      return {
        ...state,
        value: payload.text,
        isValid: payload.isValid,
        isTouched: true
      }
    case TEXT_BLUR:
      return {
        ...state,
        isTouched: true
      }
    default: 
      return state;
  }
}

const CInput = props => {
  const {id, initValue, initValid,label, onInputChange, errorText} = props;
  const [state, dispatch] = useReducer (inputReducer, {
    value: initValue,
    isValid: initValid,
    isTouched: false
  });

  useEffect (()=>{
    if ( state.isTouched ) {
      onInputChange && onInputChange (id, state.value, state.isValid);
    }
  },[state]);

  const isValidHanler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {invalidWhenEmpty, email, min, max, minLength} = props;
    let isValid = true;
    if ( !text ){
      isValid = false;
    }else {
      if (invalidWhenEmpty && text.trim().length === 0) {
        isValid = false;
      }
      if (email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
      }
      if (min != null && +text < min) {
        isValid = false;
      }
      if (max != null && +text > max) {
        isValid = false;
      }
      if (minLength != null && text.length < minLength) {
        isValid = false;
      }
    }
    return isValid;
  }

  const onInputChangeHandler  = (text) =>{
    const isValid = isValidHanler (text);
    dispatch ({type: TEXT_CHANGE, payload:{text, isValid}});
  }
  const onInputBlurHandler = () => {
    dispatch ( {type: TEXT_BLUR} );
  }
  return ( 
    <View style={{...styles.formControl, ...props.style}}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style = {styles.input}
        value = {state.value}
        onChangeText = {onInputChangeHandler}
        onBlur = {onInputBlurHandler}
      />
      {
        state.isValid || !state.isTouched ? 
        null : 
        <Text style={styles.errorText}>
          { errorText? errorText: 
            `${label} is invalid!`}
        </Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },  
  errorText: {
    color: 'red',
    fontSize: 13
  }
});

export default CInput;