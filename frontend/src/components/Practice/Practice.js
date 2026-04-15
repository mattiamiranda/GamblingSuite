import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Blackjack/Card';
import { useLanguage } from '../../i18n/LanguageContext';
import './Practice.css';

function Practice() {
  const { t } = useLanguage();
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCard, setDealerCard] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const ACTIONS = ['HIT', 'STAND', 'DOUBLE', 'SPLIT'];

  useEffect(() => {
    newHand();
  }, []);

  const newHand = async () => {
    setFeedback(null);
    setSelectedAction('');
    try {
      const response = await axios.get('/blackjack/practice');
      setPlayerCards(response.data.playerCards);
      setDealerCard(response.data.dealerCard);
    } catch (error) {
      console.error('Error fetching practice hand:', error);
    }
  };

  const validateAnswer = async () => {
    if (!selectedAction) return;

    try {
      const response = await axios.post('/blackjack/validate', {
        action: selectedAction,
        playerCards,
        dealerCard
      });

      setFeedback({
        correct: response.data.correct,
        correctAction: response.data.correctAction,
        reason: response.data.reason
      });

      setStats(prev => ({
        correct: prev.correct + (response.data.correct ? 1 : 0),
        total: prev.total + 1
      }));
    } catch (error) {
      console.error('Error validating answer:', error);
    }
  };

  return (
    <div className="game-container">
      <h2 className="game-title">{t('blackjack')} - {t('practice')}</h2>

      <div className="stats">
        <div className="stat">
          <div className="value">{stats.correct}</div>
          <div className="label">{t('correctAnswers')}</div>
        </div>
        <div className="stat">
          <div className="value">{stats.total}</div>
          <div className="label">{t('totalAnswers')}</div>
        </div>
        <div className="stat">
          <div className="value">
            {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
          </div>
          <div className="label">{t('accuracy')}</div>
        </div>
      </div>

      <div className="card-selector">
        <div className="card-group">
          <h3>{t('yourCards')}</h3>
          <div className="card-display">
            {playerCards.map((card, index) => (
              <Card key={index} rank={card.rank} suit={card.suit} />
            ))}
          </div>
        </div>

        <div className="card-group">
          <h3>{t('dealerCard')}</h3>
          <div className="card-display">
            {dealerCard && <Card rank={dealerCard.rank} suit={dealerCard.suit} />}
          </div>
        </div>
      </div>

      <div className="action-buttons">
        {ACTIONS.map(action => (
          <button
            key={action}
            className={`action-btn ${selectedAction === action ? 'selected' : ''}`}
            onClick={() => setSelectedAction(action)}
            disabled={feedback !== null}
          >
            {action}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={validateAnswer} disabled={!selectedAction || feedback !== null}>
          {t('verify')}
        </button>
        <button onClick={newHand} style={{ marginLeft: '10px', background: '#0f3460' }}>
          {t('newHand')}
        </button>
      </div>

      {feedback && (
        <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
            {feedback.correct ? '✓ ' + t('correct') : '✗ ' + t('incorrect')}
          </div>
          <div>
            {t('correctAction')}: <strong>{feedback.correctAction}</strong>
          </div>
          <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
            {feedback.reason}
          </div>
        </div>
      )}
    </div>
  );
}

export default Practice;
