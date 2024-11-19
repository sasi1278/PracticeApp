import React from 'react';
import { SafeAreaView, ScrollView, View,} from 'react-native';
import CounterRedux from './src/screens/ConterRedux';
import Sample from './src/screens/Sample';

function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1}}>
        <CounterRedux/>
        <Sample/>
      </View>
    </SafeAreaView>
  );
}

export default App;
