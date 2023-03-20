import React from 'react'
import '../App.css';

export const ShopItem = ({setCosmeticId, cosmeticId, equipCosmetic, shop,item,fizzPerClick, setFizzPerClick, score, value, setScore, setShop}) => {
 
  const updateLocal = (reload) => {
    if (reload){
      if (getFromLocalStorage("fizzPerClick")){
        setFizzPerClick(getFromLocalStorage("fizzPerClick"));
    }

    if (getFromLocalStorage("Shop")){
        setShop(getFromLocalStorage("Shop"));
    }
    if (getFromLocalStorage("Score")){
      setScore(getFromLocalStorage("Score"));
    }
    if (getFromLocalStorage("Image")){
      setCosmeticId(getFromLocalStorage("Image"))
    }
    return;
  }
  storeInLocalStorage("fizzPerClick", fizzPerClick);
  storeInLocalStorage("Shop", shop);
  storeInLocalStorage("Score", score);
  storeInLocalStorage("Image", cosmeticId)

  }

  // on reload get shop and point info
  

  const storeInLocalStorage = (key, value) => {
    if (typeof value === 'number') {
      localStorage.setItem(key, value);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  const getFromLocalStorage = (key) => {
    
      const value = localStorage.getItem(key);
      console.log(`getFromLocalStorage(${key}): ${value}`);
      if (typeof value === 'number') {
        return value;
      }
      return JSON.parse(value);
  }
  
  const funcs = {
    "FizzBoost": {
      effect: () => {
       
        const newShop = {...shop}
        if (score-newShop.FizzBoost.price<0){
          return;
        }
     
        setScore(score-newShop.FizzBoost.price);
        newShop.FizzBoost.bought+=1
        newShop.FizzBoost.price*=newShop.FizzBoost.bought;
       
        setShop(newShop);
        setFizzPerClick(fizzPerClick*10);
        updateLocal(false);
      }
    },
    "Green":{
      
      effect: () => {
         
          const newShop = {...shop}
          if (score-newShop.Green.price<0){
            return;
          }
          if (newShop.Green.bought > 0){
        
            
            console.log("GRE")
            unequipAll()
            setCosmeticId(1)
        
            newShop.Green.equipped = true;
            setShop(newShop);
            updateLocal(false)
            return;
          }
          setScore(score-newShop.Green.price);
          newShop.Green.bought+=1
          newShop.Green.price=0
          setShop(newShop);
          updateLocal(false);
         

          
      }
    },
    "Blue":{
      
      effect: () => {
         
          const newShop = {...shop}
          if (score-newShop.Blue.price<0){
            return;
          }
          if (newShop.Blue.bought > 0){
            
           
            console.log("HERE")
            unequipAll()
            setCosmeticId(0)
        
            newShop.Blue.equipped = true;
            setShop(newShop);
            updateLocal(false)
            return;
          }
          setScore(score-newShop.Green.price);
          newShop.Blue.bought+=1
          newShop.Blue.price=0
          setShop(newShop);
          updateLocal(false);
         

          
      }
    },
  }
  let buttonText = ""
  if (value.cosmetic && !value.equipped && value.bought == 0){
    buttonText = "Buy"
  } else if (value.cosmetic && !value.equipped && value.bought > 0){
    buttonText = "Equip"
  } else if (value.cosmetic && value.equipped && value.bought > 0){
    buttonText = "Equipped"
  } else if (!value.cosmetic){
    buttonText = "Buy"
  }

  const unequipAll = () => {
    const newShop = {...shop}
    Object.keys(newShop).map((key,value) => {
      if (newShop[key].cosmetic){
          newShop[key].equipped = false;
      }

    })
    setShop(newShop);
    updateLocal(false);
  }
  return (
    <div>
        <img className="img" src={value.img}/>
        <h1>{value.name}</h1>
        <h2>{value.price}</h2>
        <h2>{value.equipped}</h2>
        
        <button onClick={ 
            () =>{
      
              funcs[item].effect()
         
          } } disabled={buttonText === "Equipped"}>{buttonText}</button>
    </div>
  )
}
