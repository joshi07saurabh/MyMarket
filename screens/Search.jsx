// import React, { useState, useEffect } from 'react';
// import {
//     SafeAreaView,
//     StyleSheet,
//     ScrollView,
//     View,
//     Text,
//     StatusBar,
//     FlatList,
//     TouchableOpacity,
//     TextInput, Image
// } from 'react-native';

// export default function Search({ value, updateSearch, style }) {

//     const [query, setQuery] = useState();
//     const [error, setError] = useState()
//     return (
//         <View style={[styles.container, style]} className='top-2'>
//             <View style={styles.searchContainer} className='rounded'>
//                 <View style={styles.vwSearch}>
//                     <Image
//                         style={styles.icSearch}
//                         source={require('../assets/lense.png')} />
//                 </View>

//                 <TextInput
//                     value={query}
//                     placeholder="Search"
//                     style={styles.textInput}
//                     onChangeText={(text) => {
//                         var letters = /^$|^[a-zA-Z._\b ]+$/;
//                         if (text.length > 12)
//                             setError("Query too long.")
//                         else if (text.match(letters)) {
//                             setQuery(text)
//                             updateSearch(text)
//                             if (error)
//                                 setError(false)
//                         }
//                         else setError("Please only enter alphabets")
//                     }}
//                 />
//                 {
//                     query ?
//                         <TouchableOpacity
//                             onPress={() => setQuery('')}
//                             style={styles.vwClear}>
//                             <Image
//                                 style={styles.icClear}
//                                 source={require('../assets/lense.png')} />
//                         </TouchableOpacity>
//                         : <View style={styles.vwClear} />
//                 }

//             </View>
//             {
//                 error &&
//                 <Text style={styles.txtError}>
//                     {error}
//                 </Text>
//             }
//         </View >
//     )
// }
// const styles = StyleSheet.create({
//     txtError: {
//         marginTop: '2%',
//         width: '89%',
//         color: 'white',

//     },
//     vwClear: {
//         flex: 0.2,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     textInput: {
//         // backgroundColor: 'green',
//         flex: 1,
//     },

//     vwSearch: {
//         flex: 0.2,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // width: 40,
//         // backgroundColor: 'red'
//     },
//     icSearch: {
//         height: 18, width: 18
//     },
//     searchContainer:
//     {
//         backgroundColor: 'white',
//         width: '90%',
//         height: 40,
//         flexDirection: 'row'

//     },
//     container: {
//         height: 80,
//         alignItems: 'center',
//         // height: '100%', width: '100%'
//     },
// });

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getAllProduct } from "../database/getAllProduct";
import { getAllShop } from "../database/getAllShop";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// Assume getallshop function is defined elsewhere

const Search = () => {
  const [data, setData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  const fetchAllShopData = async () => {
    const shop = await getAllShop();
    setShopData(shop);
    setData(
      shop?.map((profile) => {
        return {
          id: profile?.uid,
          name: profile?.shopName,
          category: profile?.category || "New",
          shopImage: profile?.imageURL,
          address: profile?.mainAdd,
          city: profile?.cityAdd,
          state: profile?.stateAdd,
          pin: profile?.pinAdd,
          landmark: profile?.landmarkAdd,
          fullAddress: `${profile?.mainAdd} ${profile?.landmark}, ${profile?.cityAdd}, ${profile?.stateAdd}`,
          coordinate: [],
          ownerName: profile?.Owner,
          contactDetails: {
            contact: profile?.mobileNumber,
            email: profile?.email,
          },
          productList: [],
          postList: [],
          videoList: [],
          isShopOpen: profile?.isShopOpen,
          isUser: profile?.isUser,
        };
      })
    );
  };

  useEffect(() => {
    fetchAllShopData(); 
  },[]);

  const fetchall = async (name) => {
    const filteredData = shopData.filter((shopItem) =>
      shopItem.shopName.toLowerCase().includes(name.toLowerCase())
    );
    setData(
      filteredData?.map((profile) => {
        return {
          id: profile?.uid,
          name: profile?.shopName,
          category: profile?.category || "New",
          shopImage: profile?.imageURL,
          address: profile?.mainAdd,
          city: profile?.cityAdd,
          state: profile?.stateAdd,
          pin: profile?.pinAdd,
          landmark: profile?.landmarkAdd,
          fullAddress: `${profile?.mainAdd} ${profile?.landmark}, ${profile?.cityAdd}, ${profile?.stateAdd}`,
          coordinate: [],
          ownerName: profile?.Owner,
          contactDetails: {
            contact: profile?.mobileNumber,
            email: profile?.email,
          },
          productList: [],
          postList: [],
          videoList: [],
          isShopOpen: profile?.isShopOpen,
          isUser: profile?.isUser,
        };
      })
    );
  };
  const onSearch = (text) => {
    if (text == "") {
      setData(
        shopData?.map((profile) => {
          return {
            id: profile?.uid,
            name: profile?.shopName,
            category: profile?.category || "New",
            shopImage: profile?.imageURL,
            address: profile?.mainAdd,
            city: profile?.cityAdd,
            state: profile?.stateAdd,
            pin: profile?.pinAdd,
            landmark: profile?.landmarkAdd,
            fullAddress: `${profile?.mainAdd} ${profile?.landmark}, ${profile?.cityAdd}, ${profile?.stateAdd}`,
            coordinate: [],
            ownerName: profile?.Owner,
            contactDetails: {
              contact: profile?.mobileNumber,
              email: profile?.email,
            },
            productList: [],
            postList: [],
            videoList: [],
            isShopOpen: profile?.isShopOpen,
            isUser: profile?.isUser,
          };
        })
      );
    } else {
      fetchall(text);
    }
  };

  const navigation = useNavigation();
  const goToShopProfile = (profile) => {
    navigation.navigate("ShopProfileForUser", {
      profile,
    });
  };

  return (
    <ScrollView>
      <View className="border border-gray-200 flex flex-row items-center gap-2 bg-white px-4 ">
        <Image
          source={require("../assets/lense.png")}
          style={{ width: 24, height: 24, marginLeft: 15, opacity: 0.5 }}
        ></Image>
        <TextInput
          autoFocus
          ref={searchRef}
          placeholder="Search"
          onChangeText={(text) => {
            onSearch(text);
            setSearch(text);
          }}
          value={search}
          style={{ width: "76%", height: 50 }}
        ></TextInput>
        {search == "" ? null : (
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => {
              searchRef.current.clear();
              onSearch("");
              setSearch("");
            }}
          ></TouchableOpacity>
        )}
      </View>
      <View>
        {data.map((dataItem) => {
          return (
            <TouchableOpacity key={dataItem.name}  onPress={() => goToShopProfile(dataItem)}>
              <View className="flex flex-row bg-white m-1 rounded-md shadow-sm shadow-black">
                <View>
                  <Image
                    source={{
                      uri: dataItem.shopImage,
                    }}
                    className="rounded-md w-16 h-16 m-1"
                  />
                </View>
                <View className="flex gap-1 pt-2 pl-2">
                  <Text className="text-md font-semibold">{dataItem.name}</Text>
                  <Text className="text-[10px] text-gray-600 capitalize">
                    {dataItem.fullAddress}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Search;
