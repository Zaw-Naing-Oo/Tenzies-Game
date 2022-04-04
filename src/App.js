import {useState,useEffect} from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
// import useWindowSize from './useWindowSize';

import './App.css';

function App() {

  const [dices, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] =  useState(false);
  // const { width, height } = useWindowSize();



  useEffect( () => {
     // Check held and sameValue from die held and sameValue
      const held = dices.every(dice => dice.isHeld );
      const firstValue = dices[0].value;
      const sameValueToAllDice = dices.every( dice => dice.value === firstValue);
      if(held && sameValueToAllDice) {
        setTenzies(true);
      }
  },[dices])

  function randomDieValue() {
    return Math.ceil(Math.random() * 6)
  }

  function generateNewDice () {
         return {
          value: randomDieValue(),
          isHeld: false,
          id: nanoid()
         }
  }

  function allNewDice() {
    const newArray = []
    for(let i = 0; i < 10; i++) {
        newArray.push(generateNewDice())
    }
    return newArray
  }


  const rollDice = () => {
    setDice( oldDices => oldDices.map(oldDice => {
      return  oldDice.isHeld ? oldDice : generateNewDice()
    }))
    // if all dice are same then reset the game
    if(tenzies){                   
      setTenzies(false)
      setDice(allNewDice())       
    }
  }

  const holdDice = (id) => {
     setDice( oldDices => oldDices.map( dice => dice.id === id ? { ...dice, isHeld : !dice.isHeld } : dice))
  }
  

  //  use annonymous function to take dice id to check same id 
  const diceElements = dices.map( dice =>  <Die holdDice={() => holdDice(dice.id)}  isHeld={dice.isHeld} key={dice.id} value={dice.value} /> ) 


  


  return (
    <main className='main'>
      {tenzies &&  <Confetti />}
       <div className='header'>
         <h2>Tenzies</h2>
         <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
       </div>
       <div className='die-container' >

       { diceElements }

        {/* <Die value={1} />
        <Die value={2} />
        <Die value={3} />
        <Die value={4} />
        <Die value={5} />
        <Die value={6} />
        <Die value={7} />
        <Die value={8} />
        <Die value={9} />
        <Die value={10} /> */}
      </div>
      <button id='btn' onClick={rollDice}>{ tenzies ? 'New Game' : 'Roll' }</button>
    </main>
  );
}

export default App;
