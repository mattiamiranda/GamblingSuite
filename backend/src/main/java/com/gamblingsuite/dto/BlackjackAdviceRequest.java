package com.gamblingsuite.dto;

import com.gamblingsuite.model.Card;
import java.util.List;

public class BlackjackAdviceRequest {
    private List<Card> playerCards;
    private Card dealerCard;

    public List<Card> getPlayerCards() {
        return playerCards;
    }

    public void setPlayerCards(List<Card> playerCards) {
        this.playerCards = playerCards;
    }

    public Card getDealerCard() {
        return dealerCard;
    }

    public void setDealerCard(Card dealerCard) {
        this.dealerCard = dealerCard;
    }
}
