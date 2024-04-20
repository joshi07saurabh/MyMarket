import { View, Text } from 'react-native'
import React from 'react'
import ListComponent from '../list/ListComponent'

const ShopProfileProductTab = () => {
  const productList = [{
    imageUrl: 'https://m.media-amazon.com/images/I/41lUoCWmsOL._AC_UF420%2C420_FMjpg_.jpg',
    productName: 'Crompton Dyna Ray 9W Round B22 LED Cool Day Light Pack of 10',
    price: '40',
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/61Ib-0m2nnL._AC_UL480_QL65_.jpg',
    productName: 'Eveready 12W B22D Emergency Inverter LED Bulb| Cool Day Light (6500K) | Energy Efficient | 4 Hour Battery Backup | Li-on Battery Inside',
    price: '80',
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/71AQFEqJRbL._AC_UL480_QL65_.jpg',
    productName: 'Halonix Radar 10W B22 Cool day white Motion Sensor Led Bulb, Auto on-Auto off, Pack of 1, White',
    price: '100',
  }
]
  return (
    <View className='flex flex-1 h-full bg-white'>
      
      {productList.map((product)=>{
        return (
          <ListComponent {...product}/>
        )
      })}
    </View>
  )
}

export default ShopProfileProductTab