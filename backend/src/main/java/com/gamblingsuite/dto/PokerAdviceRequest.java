package com.gamblingsuite.dto;

import com.gamblingsuite.model.Card;
import java.util.List;

public class PokerAdviceRequest {
    private List<Card> holeCards;
    private List<Card> tableCards;

    public List<Card> getHoleCards() {
        return holeCards;
    }

    public void setHoleCards(List<Card> holeCards) {
        this.holeCards = holeCards;
    }

    public List<Card> getTableCards() {
        return tableCards;
    }

    public void setTableCards(List<Card> tableCards) {
        this.tableCards = tableCards;
    }
}
