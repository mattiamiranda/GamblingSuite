import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Blackjack/Card';
import './Poker.css';

const RANKS = ['TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'JACK', 'QUEEN', 'KING', 'ACE'];
const SUITS = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];

function Poker() {
  const [holeCards, setHoleCards] = useState([
    { rank: 'ACE', suit: 'SPADES' },
    { rank: 'KING', suit: 'HEARTS' }
  ]);
  const [tableCards, setTableCards] = useState([]);
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    axios.get('/poker/hands-ranking')
      .then(res => setRanking(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCardChange = (index, field, value, isTable = false) => {
    if (isTable) {
      const newCards = [...tableCards];
      newCards[index] = { ...newCards[index], [field]: value };
      setTableCards(newCards);
    } else {
      const newCards = [...holeCards];
      newCards[index] = { ...newCards[index], [field]: value };
      setHoleCards(newCards);
    }
  };

  const addTableCard = () => {
    if (tableCards.length < 5) {
      setTableCards([...tableCards, { rank: 'TEN', suit: 'HEARTS' }]);
    }
  };

  const removeTableCard = () => {
    if (tableCards.length > 0) {
      setTableCards(tableCards.slice(0, -1));
    }
  };

  const getAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/poker/advice', {
        holeCards,
        tableCards
      });
      setAdvice(response.data);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
    setLoading(false);
  };

  return (
    <div className="game-container">
      <h2 className="game-title">Texas Hold'em Advisor</h2>

      <div className="card-selector">
        <div className="card-group">
          <h3>Hole Cards</h3>
          <div className="card-display">
            {holeCards.map((card, index) => (
              <Card key={index} rank={card.rank} suit={card.suit} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {holeCards.map((card, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <select
                  value={card.rank}
                  onChange={(e) => handleCardChange(index, 'rank', e.target.value)}
                >
                  {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <select
                  value={card.suit}
                  onChange={(e) => handleCardChange(index, 'suit', e.target.value)}
                >
                  {SUITS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="card-group">
          <h3>Carte Tavolo ({tableCards.length}/5)</h3>
          <div className="card-display">
            {tableCards.map((card, index) => (
              <Card key={index} rank={card.rank} suit={card.suit} />
            ))}
            {tableCards.length < 5 && (
              Array(5 - tableCards.length).fill(null).map((_, i) => (
                <div key={`empty-${i}`} className="card empty-slot"></div>
              ))
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
            {tableCards.length < 5 && (
              <button onClick={addTableCard} style={{ padding: '8px 15px', margin: 0 }}>
                + Carta
              </button>
            )}
            {tableCards.length > 0 && (
              <button onClick={removeTableCard} style={{ padding: '8px 15px', margin: 0, background: '#666' }}>
                - Carta
              </button>
            )}
          </div>
          {tableCards.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
              {tableCards.map((card, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <select
                    value={card.rank}
                    onChange={(e) => handleCardChange(index, 'rank', e.target.value, true)}
                  >
                    {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <select
                    value={card.suit}
                    onChange={(e) => handleCardChange(index, 'suit', e.target.value, true)}
                  >
                    {SUITS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={getAdvice} disabled={loading}>
          {loading ? 'Calcolo...' : 'Consigliami!'}
        </button>
      </div>

      {advice && (
        <div className="advice-box">
          <div className="action">{advice.action}</div>
          <div className="confidence">Confidence: {advice.confidence}</div>
          <div className="reason">{advice.reason}</div>
        </div>
      )}

      <div className="tutorial-section" style={{ marginTop: '30px' }}>
        <h3> ranking Mani di Poker</h3>
        <ul>
          {ranking.map((hand, index) => (
            <li key={index}>{hand}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Poker;
