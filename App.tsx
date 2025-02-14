import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView,StyleSheet,View} from 'react-native';
import axios from 'axios';
import CustomText from './src/components/customtext/CustomText';

const RenderItem = React.memo(({ item }: { item: any }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.flags.png }} style={styles.flagImage} />
    <View style={styles.textContainer}>
      <CustomText children={`${item.name.common}`} size={15} />
      <CustomText children={`${item.name.official}`} size={15} />
    </View>
  </View>
));


function App() {
  const [data,setData]=useState([])
  useEffect(()=>{
    if (data && data.length === 0) { 
      axios.get('https://restcountries.com/v3.1/all?fields=name,flags').then((res)=>{
        return res?.data
      }).then((data)=>{
        setData(data)
      }).catch((e)=>{
        console.log('errror--------->',e)
      })
    }
  },[data])

  const renderItem = ({ item }: { item: any }) => {
    return <RenderItem item={item} />;
  };
  const ITEM_HEIGHT = 0.1 * Dimensions.get('window').height + 20;
  const getItemLayout = (_data:any, index:any) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT* index,
    index,
  });
  
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1,marginHorizontal:10}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item?.name?.common || item?.name?.official}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        windowSize={5} 
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
      />
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    height:0.1*Dimensions.get('window').height
  },
  flagImage: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  commonName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  officialName: {
    fontSize: 14,
    color: 'gray',
  },
});

export default App;
