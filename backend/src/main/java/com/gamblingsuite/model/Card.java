package com.gamblingsuite.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Card {
    private Rank rank;
    private Suit suit;

    public Card() {}

    @JsonCreator
    public Card(@JsonProperty("rank") String rank, @JsonProperty("suit") String suit) {
        this.rank = Rank.valueOf(rank);
        this.suit = Suit.valueOf(suit);
    }

    public Card(Rank rank, Suit suit) {
        this.rank = rank;
        this.suit = suit;
    }

    public Rank getRank() {
        return rank;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }

    public Suit getSuit() {
        return suit;
    }

    public void setSuit(Suit suit) {
        this.suit = suit;
    }

    @Override
    public String toString() {
        return rank + "_of_" + suit.toString().toLowerCase();
    }
}
