import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);

  const [firstSelectionKey, setFirstSelectionKey] = useState(null);

  const items = [
    {
      emoji: '👇',
      id: '1',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '👀',
      id: '2',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '🙌',
      id: '3',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '👋',
      id: '4',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '🙏',
      id: '5',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '🤔',
      id: '6',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '🤦‍♂️',
      id: '7',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '😔',
      id: '8',
      matchFound: false,
      flipped: false,
    },
  ];

  function resetCards() {
    const shuffled = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, key: Math.random() }));
    setCards(shuffled);
    // console.log(shuffled);
  }

  function handleCardClick(e, key) {
    if (firstSelection && firstSelectionKey !== key) {
      setSecondSelection(e.target.dataset.id);
    } else {
      setFirstSelection(e.target.dataset.id);
      setFirstSelectionKey(key);
      // console.log(key);
    }
    // to do: handle duplicated single card click
  }

  function resetTurn() {
    setFirstSelection(null);
    setFirstSelectionKey(null);
    setSecondSelection(null);
    setMoves((m) => m + 1);
    setDisabled(false);
  }

  function handleNewGameClick() {
    resetTurn();
    setMoves(0);
    setScore(0);
    resetCards();
  }

  useEffect(() => {
    if (!secondSelection) {
      return;
    }
    setDisabled(true);
    if (firstSelection === secondSelection) {
      setCards((prev) => {
        return prev.map((card) => {
          if (card.id === firstSelection) {
            return { ...card, matchFound: true };
          } else {
            return card;
          }
        });
      });
      setScore((prev) => prev + 1);
      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 500);
    }
  }, [firstSelection, secondSelection]);

  useEffect(() => {
    resetCards();
  }, []);

  return (
    <div className="App">
      <button onClick={() => handleNewGameClick()}>New Game</button>
      <div className="gameboard">
        {cards &&
          Object.values(cards).map((card) => (
            <Card
              key={card.key}
              card={card}
              disabled={disabled}
              handleCardClick={(e) => handleCardClick(e, card.key)}
            />
          ))}
      </div>
      <div className="score">
        <p style={{ fontSize: 30, fontWeight: 'bold' }}>Total Moves: {moves}</p>
        <p style={{ fontSize: 30, fontWeight: 'bold' }}>Total Score: {score}</p>
      </div>
    </div>
  );
}

export default App;
