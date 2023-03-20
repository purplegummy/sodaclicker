import React from 'react'
import {ShopItem} from './ShopItem'
export const Shop = ({setCosmeticId, cosmeticId, equipCosmetic, shop, fizzPerClick, setFizzPerClick, score, setScore, setShop}) => {
  
 

  return (
    <div>
      {
        Object.keys(shop).map((item, value) => {
          
          return <><ShopItem key={value} setCosmeticId={setCosmeticId} cosmeticId={cosmeticId} equipCosmetic={equipCosmetic} item={item} value={Object.values(shop)[value]} shop={shop} fizzPerClick={fizzPerClick} setFizzPerClick={setFizzPerClick} score={score} setScore={setScore} setShop={setShop}/></>
      })
      }
      
    </div>
  )
}
