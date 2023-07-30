import React from 'react'
import Center from './Center'

const FeaturedSlider = () => {
    const slide = [
        { url: 'https://dlcdnwebimgs.asus.com/gain/21AE219C-6E24-4FD8-B83D-EFC9E131B315/fwebp'
        },

        { url: 'https://media.suara.com/pictures/653x366/2021/01/13/35619-asus-rog-ces-2021.jpg'
    },

    { url: 'https://rog.asus.com/event/id/ROGIntel12thGen/img/dekstop-banner.jpg'
},
    ]
  return (
    <>
    <Center>
      <div className='max-w[1400px] h-[780px] w-full m-auto py-16 px-4 relative'>
         <div 
         className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
        style={{backgroundImage: `url(${slide[0].url})`}}
         >

         </div>
      </div>
    </Center>
    </>
  )
}

export default FeaturedSlider