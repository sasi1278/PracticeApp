import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment,decrement } from '../redux/counterSlice';
import { RootState, store } from '../redux/store';
import CustomText from '../components/customtext/CustomText';

function CounterRedux() {
  const count = useSelector((state: RootState) => state?.value);
  
  const dispatch = useDispatch();
  const increase=()=>{
    dispatch(increment())
  }
  const decrease=()=>{
    dispatch(decrement())
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ marginRight: 10,zIndex:19, padding: 10, backgroundColor: '#DDDDDD' }}
          onPress={increase}
        >
          <CustomText children='Increment' size={20}/>
        </TouchableOpacity>

        <CustomText children={`${count}`} size={20}/>

        <TouchableOpacity
          style={{ marginLeft: 10, padding: 10, backgroundColor: '#DDDDDD' }}
          onPress={decrease}
        >
         <CustomText children='Decrement' size={20}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CounterRedux;
