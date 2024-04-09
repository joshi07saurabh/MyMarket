import { View, Text ,Image} from 'react-native'
import React from 'react'

const ShopProfilePostTab = () => {
  console.log('ShopProfileImageTab')
  const postLinks = [
    "https://etimg.etb2bimg.com/photo/76159933.cms",
    "https://content3.jdmagicbox.com/comp/delhi/u3/011pxx11.xx11.000376912239.h5u3/catalogue/classic-shoes-malviya-nagar-delhi-imported-shoe-dealers-c06yx780vd.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkp0WgtmAJhY7-JEq8Qhbrn-gdusUROq5qKKb231sr9g&s",
    "https://content.jdmagicbox.com/comp/villupuram/p3/0413px413.x413.171224080158.r7p3/catalogue/a-m-s-footwear-thirubuvanai-villupuram-shoe-dealers-9uyqd7005f.jpg?clr=",
    "https://content.jdmagicbox.com/comp/delhi/s6/011pxx11.xx11.220912134917.t3s6/catalogue/shivam-traders-indralok-delhi-shoe-manufacturers-lt09sc7p2b.jpg",
    "https://etimg.etb2bimg.com/photo/76159933.cms",
    "https://content3.jdmagicbox.com/comp/delhi/u3/011pxx11.xx11.000376912239.h5u3/catalogue/classic-shoes-malviya-nagar-delhi-imported-shoe-dealers-c06yx780vd.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkp0WgtmAJhY7-JEq8Qhbrn-gdusUROq5qKKb231sr9g&s",


  ]
  return (
    <View>
      <View className='flex flex-row flex-wrap bg-white h-full'>
      {postLinks.map(postLink => ( <View className='w-1/3 h-40 aspect-square border border-white'>
          <Image source={{uri:postLink}} className='w-full h-full'></Image>
        </View>
      ))
    }
        

      </View>
    </View>
  )
}

export default ShopProfilePostTab