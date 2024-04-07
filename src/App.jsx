import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [winCounter, setWinCounter] = useState(0);
  const [cards, setCards] = useState();
  const [keys, setKeys] = useState([]);
  const [cardImg, setCardImg] = useState();
  const [isLost, setIsLost] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // api call with useEffect & axios
  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.get(
          "https://www.deckofcardsapi.com/api/deck/new/draw/?count=5"
        );
        setCards(response.data.cards);
      } catch (error) {
        console.log(error);
      }
    };
    getCards();
  }, [winCounter]);

  // win counter
  function clickCounter() {
    setWinCounter((prev) => prev + 1);
  }
  // set keys in an array to see if a number was clicked before or not
  function keySetter(key) {
    setKeys((prev) => [...prev, key]);
  }

  // check if player won
  function checkWin(key) {
    if (keys.includes(key)) {
      setIsLost(true);
    }
  }
  // keep track of high score
  function ScordRecord(score, Hscore) {
    if (score > Hscore) {
      setHighScore(score);
    } else {
      setHighScore(Hscore);
    }
  }

  return (
    <div className="game-container">
      {isLost ? (
        <>
          <button
            className="retry-btn"
            onClick={() => {
              setIsLost(false);
              setWinCounter(0);
              ScordRecord(winCounter, highScore);
            }}
          >
            Retry
          </button>
          <div className="lost">You lost the game</div>
        </>
      ) : (
        <>
          <div className="win-counter">Highest Score : {highScore} </div>
          <div className="win-counter">current wins :{winCounter}</div>
          <div className="deck">
            {cards &&
              cards.map((card) => (
                <img
                  key={card.code}
                  src={card.image}
                  alt="no img"
                  onClick={() => {
                    keySetter(card.code);
                    clickCounter();
                    checkWin(card.code);
                  }}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
