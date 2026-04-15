import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { useLanguage } from '../../i18n/LanguageContext';
import './Blackjack.css';

const RANKS = ['TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'JACK', 'QUEEN', 'KING', 'ACE'];
const SUITS = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];

function Blackjack() {
  const { t } = useLanguage();
  const [playerCards, setPlayerCards] = useState([
    { rank: 'EIGHT', suit: 'HEARTS' },
    { rank: 'EIGHT', suit: 'SPADES' }
  ]);
  const [dealerCard, setDealerCard] = useState({ rank: 'SIX', suit: 'CLUBS' });
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCardChange = (index, field, value) => {
    const newCards = [...playerCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setPlayerCards(newCards);
  };

  const getAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/blackjack/advice', {
        playerCards,
        dealerCard
      });
      setAdvice(response.data);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
    setLoading(false);
  };

  return (
    <div className="game-container">
      <h2 className="game-title">{t('blackjack')} Advisor</h2>

      <div className="card-selector">
        <div className="card-group">
          <h3>{t('yourCards')}</h3>
          <div className="card-display">
            {playerCards.map((card, index) => (
              <Card key={index} rank={card.rank} suit={card.suit} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {playerCards.map((card, index) => (
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
          <h3>{t('dealerCard')}</h3>
          <div className="card-display">
            <Card rank={dealerCard.rank} suit={dealerCard.suit} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
            <select
              value={dealerCard.rank}
              onChange={(e) => setDealerCard({ ...dealerCard, rank: e.target.value })}
            >
              {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select
              value={dealerCard.suit}
              onChange={(e) => setDealerCard({ ...dealerCard, suit: e.target.value })}
            >
              {SUITS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={getAdvice} disabled={loading}>
          {loading ? t('calculating') : t('getAdvice')}
        </button>
      </div>

      {advice && (
        <div className="advice-box">
          <div className="action">{advice.action}</div>
          <div className="reason">{advice.reason}</div>
        </div>
      )}
    </div>
  );
}

export default Blackjack;
