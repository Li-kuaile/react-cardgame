<<<<<<< HEAD
import head from '../assets/react.svg';
import './Card.css';
import { useState } from 'react';

const Card = ({ card, handleCardClick, disabled }) => {
  const [flip, setFlip] = useState(0);
  return (
    <button
      className={`card ${card.matchFound ? 'matched' : ''} ${
        flip % 2 === 1 ? 'flip' : ''
      }`}
      disabled={disabled}
      onClick={(e) => {
        handleCardClick(e, card.key);
        setFlip(flip + 1);
      }}
      data-id={card.id}
    >
      <div className="front side">
        <img src={head} alt="head" width="60" />
      </div>
      <div className="side back">{card.emoji}</div>
    </button>
  );
};
export default Card;
=======
import head from '../assets/react.svg';
import './Card.css';
import { useState } from 'react';

const Card = ({ card, handleCardClick, disabled }) => {
  const [flip, setFlip] = useState(0);
  return (
    <button
      className={`card ${card.matchFound ? 'matched' : ''} ${
        flip % 2 === 1 ? 'flip' : ''
      }`}
      disabled={disabled}
      onClick={(e) => {
        handleCardClick(e, card.key);
        setFlip(flip + 1);
      }}
      data-id={card.id}
    >
      <div className="front side">
        <img src={head} alt="head" width="60" />
      </div>
      <div className="side back">{card.emoji}</div>
    </button>
  );
};
export default Card;
>>>>>>> 93eae62b886383db7b29fb6548ce504e41034e74
