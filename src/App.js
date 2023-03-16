import './App.css';
import { Shop } from './components/Shop';
import React from 'react';
import { motion } from "framer-motion";
import cosmetic1 from "./cosmetics/default.png"
function App() {
  const [fizzPerClick, setFizzPerClick] = React.useState(1);
  const [showShop, setShowShop] = React.useState(false);
  const [currentCosmeticId, setCurrentCosmeticId] = React.useState(0);
  const [img, setImg] = React.useState();
  const [score, setScore] = React.useState(0);
  const cosmetics = {
      0: cosmetic1,
      1: "",
      2: "",
  }

  React.useEffect(()=> {
    console.log(
      score
    )
  }, [score])
  const [shop, setShop] = React.useState({
    FizzBoost: {
      img: cosmetic1,
      name: "FizzBoost",
      cosmetic: false,
      price: 100,
      bought: 0,
      equipped: false,
      effect: () => {
          // make exponential?
          setFizzPerClick(fizzPerClick*10);
          
          this.bought+=1
          this.price*=4**this.bought;
          setScore(score-this.price);
          setShop(shop);
      }



    },
    Green:{
      img:"",
      name: "Green",
      cosmetic: true,
      price: 15000,
      bought: 0,
      equipped: false,
    
      effect: () => {
          // make exponential?
          setFizzPerClick(fizzPerClick*10);
          
      }
    },
    Blue:{
      img: "",
      name:"Blue",
      cosmetic: true,
      price: 15000,
      bought: 0,
      equipped: false,
      
      effect: () => {
          // make exponential?
          setFizzPerClick(fizzPerClick*10);
          
      }
    },
  })

  const equipCosmetic = (cosmeticPathId) => { 
    setCurrentCosmeticId(cosmeticPathId); return
    
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
    return;
  }
  storeInLocalStorage("fizzPerClick", fizzPerClick);
  storeInLocalStorage("Shop", shop);

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
      if (typeof value === 'number') {
        return value;
      }
      return JSON.parse(value);
  }
  
  return (
    <div className="App">
      <button onClick={() => setShowShop(!showShop)}>{showShop ? "X" : "Shop"} </button>
      {showShop && <Shop shop={shop} fizzPerClick={fizzPerClick} setFizzPerClick={setFizzPerClick} score={score}></Shop>}
      <h1>{score}</h1>
      <div onClick={() => {
        setScore(score+fizzPerClick)
        storeInLocalStorage("Score", score+1)
      }}>
          <motion.div whileTap={{ scale: 0.95 }}>
            

          <img id="img" className="img" src={cosmetics[currentCosmeticId]} alt="something"></img>
        </motion.div>
      </div>
     
      
    </div>
  );
}

export default App;
