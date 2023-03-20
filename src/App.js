import './App.css';
import { Shop } from './components/Shop';
import React from 'react';
import { motion } from "framer-motion";
import cosmetic1 from "./cosmetics/default.png"
import cosmetic2 from "./cosmetics/green.png"
function App() {
  const [fizzPerClick, setFizzPerClick] = React.useState(1);
  const [showShop, setShowShop] = React.useState(false);
  const [currentCosmeticId, setCurrentCosmeticId] = React.useState(0);
  const [img, setImg] = React.useState();
  const [score, setScore] = React.useState(0);
  const cosmetics = {
      0: cosmetic1,
      1: cosmetic2,
      2: "",
  }


  const [shop, setShop] = React.useState({
    FizzBoost: {
      img: cosmetic1,
      name: "FizzBoost",
      cosmetic: false,
      price: 10,
      bought: 0,
      equipped: false,
    


    },
    Green:{
      img:cosmetic2,
      name: "Green",
      cosmetic: true,
      price: 15000,
      bought: 0,
      equipped: false,
    
      effect: () => {
         
         
          setFizzPerClick(fizzPerClick*10);
          
      }
    },
    Blue:{
      img: cosmetic1,
      name:"Blue",
      cosmetic: true,
      price: 0,
      bought: 1,
      equipped: true,
      
      effect: () => {
          
          setFizzPerClick(fizzPerClick*10);
          
      }
    },
  })

  const equipCosmetic = (cosmeticPathId) => { 
    setCurrentCosmeticId(cosmeticPathId); 
    
  }
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
      setCurrentCosmeticId(getFromLocalStorage("Image"))
    }
    return;
  }
  storeInLocalStorage("fizzPerClick", fizzPerClick);
  storeInLocalStorage("Shop", shop);
  storeInLocalStorage("Score", score);
  storeInLocalStorage("Image", currentCosmeticId)
  }

  // on reload get shop and point info
  React.useEffect(() => {
    
   updateLocal(true);
   
  }, [])

 

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
  if (showShop){
    return (
      <div className="App">
        <button onClick={() => setShowShop(!showShop)}>{showShop ? "X" : "Shop"} </button>
        <h1 className='home'>${score}</h1>
        {showShop ? <Shop setCosmeticId={setCurrentCosmeticId} cosmeticId={currentCosmeticId} equipCosmetic={equipCosmetic} shop={shop} fizzPerClick={fizzPerClick} setFizzPerClick={setFizzPerClick} score={score} setScore={setScore} setShop={setShop}></Shop> : <div onClick={() => {
          setScore(score+fizzPerClick)
          updateLocal(false);
         
        }}>
            <motion.div whileTap={{ scale: 0.95 }}>
              
  
            <img id="img" className="img" src={cosmetics[currentCosmeticId]} alt="something"></img>
          </motion.div>
        </div>}
       
        
        
      </div>
  )} else {
    return (
      <div className="App">
        <button onClick={() => setShowShop(!showShop)}>{showShop ? "X" : "Shop"} </button>
        <h1 className='home'>${score}</h1>
       <div onClick={() => {
          setScore(score+fizzPerClick)
          updateLocal(false);
         
        }}>
            <motion.div whileTap={{ scale: 0.70 }}>
              
  
            <img id="img" className="img" src={cosmetics[currentCosmeticId]} alt="something"></img>
          </motion.div>
        </div>
       
        
       
        
      </div>
    );
  }
  
}

export default App;
