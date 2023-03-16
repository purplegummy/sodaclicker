import React from 'react'
import {ShopItem} from './ShopItem'
export const Shop = ({shop, fizzPerClick, setFizzPerClick, score}) => {
  
  console.log(JSON.stringify(shop));

  return (
    <div>
      {
        Object.keys(shop).map((item) => {
          return <><ShopItem item={item} shop={shop} fizzPerClick={fizzPerClick} setFizzPerClick={setFizzPerClick} score={score}/></>
      })
      }
      
    </div>
  )
}
