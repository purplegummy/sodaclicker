import React from 'react'
import '../App.css';
export const ShopItem = ({shop,item,fizzPerClick, setFizzPerClick, score}) => {

  
  
  return (
    <div>
        <img className="img" src={shop[item].img}/>
        <h1>{shop[item].name}</h1>
        <h2>{shop[item].price}</h2>
        <h2>{shop[item].equipped}</h2>
        
        <button onClick={ 
            () =>{shop[item].effect()}
         
          }>Buy</button>
    </div>
  )
}
