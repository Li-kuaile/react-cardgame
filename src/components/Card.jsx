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
