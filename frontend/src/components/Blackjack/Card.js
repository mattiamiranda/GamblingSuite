import React from 'react';

const SUIT_SYMBOLS = {
  HEARTS: '♥',
  DIAMONDS: '♦',
  CLUBS: '♣',
  SPADES: '♠'
};

const RANK_DISPLAY = {
  TWO: '2', THREE: '3', FOUR: '4', FIVE: '5', SIX: '6', SEVEN: '7',
  EIGHT: '8', NINE: '9', TEN: '10', JACK: 'J', QUEEN: 'Q', KING: 'K', ACE: 'A'
};

function Card({ rank, suit }) {
  const isRed = suit === 'HEARTS' || suit === 'DIAMONDS';

  return (
    <div className={`card ${isRed ? 'red' : ''}`}>
      <div className="card-suit">{SUIT_SYMBOLS[suit]}</div>
      <div className="card-rank">{RANK_DISPLAY[rank]}</div>
      <div className="card-suit">{SUIT_SYMBOLS[suit]}</div>
    </div>
  );
}

export default Card;
