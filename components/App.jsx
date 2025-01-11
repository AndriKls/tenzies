import React from "react";
import Die from "./Die";
import Confetti from "./Confetti";

function generateAllNewDice() {
    console.log("Generating all new")
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
        diceArray.push({
        id: i,
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
    });
  }
  return diceArray;
}

export default function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());
  const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

  function toggleHold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }

  function resetGame() {
    setDice(generateAllNewDice());
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onClick={() => toggleHold(die.id)}
    />
  ));

  return (
    <main>
        <h1 className="title">Täringumäng</h1>
        <p className="instructions">Veereta täringuid seni, kuni kõik täringud näitavad sama numbrit. Klõpsa iga täringu peale, et see oma praegusele väärtusele lukustada järgmiste veeretuste ajaks.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="rollButton" onClick={gameWon ? resetGame : rollDice}>{gameWon ? "Uus mäng" : "Veereta"}</button>
      {gameWon && <Confetti />}
    </main>
  );
}
