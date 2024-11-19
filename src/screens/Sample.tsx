import React,{useEffect, useState} from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import CustomText from "../components/customtext/CustomText";

const fruits = [
    { id:1,count: 10, fruitName: "Apple" },
    {id:2, count: 20, fruitName: "Banana" },
    { id:3,count: 15, fruitName: "Orange" },
    { id:4,count: 8, fruitName: "Grapes" },
    {id:5, count: 12, fruitName: "Mango" },
];

type fruit={
    id:number,
    count:number,
    fruitName:string
}

function Sample(){
    const [data,setData]=useState<fruit[]>(fruits)
    const increase=(item:fruit)=>{
        setData((prev)=>
            prev.map((val)=>{
                if(val?.id===item?.id){
                    return {...val,count:val?.count+1}
                }
                return val
            })
        )
    }

    const decrease=(item:fruit)=>{
        setData((prev)=>
            prev.map((val)=>{
                if(val?.id===item?.id){
                    return {...val,count:val?.count-1}
                }
                return val
            })
        )
    }
    const renderItem=({item}:{item:fruit})=>{
        return(
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <CustomText children={`${item?.fruitName}:${item?.count}`} size={15}/>
                <TouchableOpacity onPress={()=>increase(item)}>
                    <CustomText children='increase' size={15}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>decrease(item)}>
                    <CustomText children='decrease' size={15}/>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <View style={{flex:1,padding:10}}>
            <FlatList data={data} contentContainerStyle={{ paddingBottom: 20 }} keyExtractor={(item)=>item?.id.toString()} renderItem={renderItem}/>
        </View>
    )
}

export default Sample