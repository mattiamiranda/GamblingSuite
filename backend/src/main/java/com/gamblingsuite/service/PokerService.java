package com.gamblingsuite.service;

import com.gamblingsuite.dto.PokerAdviceRequest;
import com.gamblingsuite.dto.PokerAdviceResponse;
import com.gamblingsuite.model.Card;
import com.gamblingsuite.model.Rank;
import com.gamblingsuite.model.Suit;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PokerService {

    public PokerAdviceResponse getAdvice(PokerAdviceRequest request) {
        List<Card> holeCards = request.getHoleCards();
        List<Card> tableCards = request.getTableCards();

        if (holeCards == null || holeCards.size() != 2) {
            return new PokerAdviceResponse("INVALID", "LOW", "Inserisci 2 carte personali");
        }

        if (tableCards != null && tableCards.size() == 5) {
            return evaluateShowdown(holeCards, tableCards);
        }

        return evaluatePreFlopOrFlop(holeCards, tableCards);
    }

    private PokerAdviceResponse evaluateShowdown(List<Card> holeCards, List<Card> tableCards) {
        List<Card> allCards = new ArrayList<>(holeCards);
        allCards.addAll(tableCards);

        String handName = evaluateHand(allCards);
        String action = determineActionFromHand(handName);
        String confidence = determineConfidence(handName);

        return new PokerAdviceResponse(action, confidence, handName);
    }

    private PokerAdviceResponse evaluatePreFlopOrFlop(List<Card> holeCards, List<Card> tableCards) {
        boolean isSuited = holeCards.get(0).getSuit() == holeCards.get(1).getSuit();
        boolean isConnected = Math.abs(holeCards.get(0).getRank().ordinal() - holeCards.get(1).getRank().ordinal()) <= 2;
        boolean isHighCard = holeCards.stream().allMatch(c -> c.getRank().ordinal() >= Rank.TEN.ordinal());

        if (tableCards == null || tableCards.isEmpty()) {
            return evaluatePreFlop(holeCards, isSuited, isConnected, isHighCard);
        }

        return evaluateFlop(holeCards, tableCards, isSuited, isConnected, isHighCard);
    }

    private PokerAdviceResponse evaluatePreFlop(List<Card> holeCards, boolean isSuited, boolean isConnected, boolean isHighCard) {
        Rank r1 = holeCards.get(0).getRank();
        Rank r2 = holeCards.get(1).getRank();
        int high = Math.max(r1.ordinal(), r2.ordinal());
        int low = Math.min(r1.ordinal(), r2.ordinal());

        if (r1 == r2) {
            if (high >= Rank.QUEEN.ordinal()) {
                return new PokerAdviceResponse("RAISE", "HIGH", "Coppia alta AA,KK,QQ - RAISE");
            }
            if (high >= Rank.TEN.ordinal()) {
                return new PokerAdviceResponse("RAISE", "HIGH", "TT - RAISE");
            }
            if (high >= Rank.SEVEN.ordinal()) {
                return new PokerAdviceResponse("CALL", "MEDIUM", "77-99 - CALL");
            }
            return new PokerAdviceResponse("CALL", "LOW", "Coppie basse - CALL");
        }

        if (high >= Rank.ACE.ordinal() && low >= Rank.TEN.ordinal()) {
            return new PokerAdviceResponse("RAISE", "HIGH", "AK/AQ/AJ - RAISE");
        }

        if (high >= Rank.KING.ordinal() && low >= Rank.TEN.ordinal()) {
            return new PokerAdviceResponse("RAISE", "MEDIUM", "KQ/KJ/KT - RAISE");
        }

        if (high >= Rank.QUEEN.ordinal() && low >= Rank.NINE.ordinal()) {
            return new PokerAdviceResponse("CALL", "MEDIUM", "QJs - CALL");
        }

        if (high >= Rank.JACK.ordinal() && low >= Rank.NINE.ordinal() && isSuited) {
            return new PokerAdviceResponse("CALL", "MEDIUM", "JTs suited - CALL");
        }

        if (isHighCard && isSuited && isConnected) {
            return new PokerAdviceResponse("CALL", "LOW", "Broadway suited - CALL");
        }

        return new PokerAdviceResponse("FOLD", "LOW", "Mano debole - FOLD");
    }

    private PokerAdviceResponse evaluateFlop(List<Card> holeCards, List<Card> tableCards, boolean isSuited, boolean isConnected, boolean isHighCard) {
        List<Card> allCards = new ArrayList<>(holeCards);
        allCards.addAll(tableCards);

        String handName = evaluateHand(allCards);
        boolean hasPair = handName.contains("Coppia");
        boolean hasTwoPair = handName.contains("Doppia Coppia");
        boolean hasTrips = handName.contains("Tris");
        boolean hasFlush = handName.contains("Colore");
        boolean hasStraight = handName.contains("Scala");
        boolean hasFullHouse = handName.contains("Full");

        if (hasFullHouse) {
            return new PokerAdviceResponse("RAISE", "HIGH", "Full House - RAISE aggressively");
        }
        if (hasFlush || hasStraight) {
            return new PokerAdviceResponse("RAISE", "HIGH", handName + " - RAISE");
        }
        if (hasTrips) {
            return new PokerAdviceResponse("RAISE", "HIGH", "Tris - RAISE");
        }
        if (hasTwoPair) {
            return new PokerAdviceResponse("RAISE", "MEDIUM", "Doppia Coppia - RAISE");
        }
        if (hasPair) {
            return new PokerAdviceResponse("CALL", "MEDIUM", handName + " - CALL");
        }

        if (isHighCard && tableCards.size() >= 3) {
            return new PokerAdviceResponse("CHECK", "LOW", "Overcards - CHECK");
        }

        return new PokerAdviceResponse("FOLD", "LOW", "Nessun punto - FOLD");
    }

    private String determineActionFromHand(String handName) {
        if (handName.contains("Scala Reale") || handName.contains("Scala Colore")) {
            return "ALL_IN";
        }
        if (handName.contains("Poker") || handName.contains("Full") || handName.contains("Colore") || handName.contains("Scala")) {
            return "RAISE";
        }
        if (handName.contains("Tris")) {
            return "RAISE";
        }
        if (handName.contains("Doppia Coppia")) {
            return "CALL";
        }
        if (handName.contains("Coppia")) {
            return "CALL";
        }
        return "FOLD";
    }

    private String determineConfidence(String handName) {
        if (handName.contains("Scala Reale") || handName.contains("Poker")) {
            return "VERY_HIGH";
        }
        if (handName.contains("Scala Colore") || handName.contains("Full")) {
            return "HIGH";
        }
        if (handName.contains("Colore") || handName.contains("Scala")) {
            return "HIGH";
        }
        if (handName.contains("Tris")) {
            return "HIGH";
        }
        if (handName.contains("Doppia Coppia")) {
            return "MEDIUM";
        }
        if (handName.contains("Coppia")) {
            return "MEDIUM";
        }
        return "LOW";
    }

    private String evaluateHand(List<Card> cards) {
        Map<Suit, Long> suitCount = cards.stream().collect(Collectors.groupingBy(Card::getSuit, Collectors.counting()));
        Map<Rank, Long> rankCount = cards.stream().collect(Collectors.groupingBy(Card::getRank, Collectors.counting()));

        boolean hasFlush = suitCount.values().stream().anyMatch(c -> c >= 5);
        boolean hasFourOfAKind = rankCount.values().stream().anyMatch(c -> c >= 4);
        boolean hasFullHouse = rankCount.values().stream().anyMatch(c -> c >= 3) && rankCount.values().stream().anyMatch(c -> c >= 2);
        boolean hasThreeOfAKind = rankCount.values().stream().anyMatch(c -> c >= 3);
        boolean hasTwoPair = rankCount.values().stream().filter(c -> c >= 2).count() >= 2;
        boolean hasPair = rankCount.values().stream().anyMatch(c -> c >= 2);

        List<Rank> sortedRanks = cards.stream().map(Card::getRank).sorted(Comparator.comparingInt(Rank::ordinal).reversed()).distinct().toList();
        boolean hasStraight = checkStraight(sortedRanks);

        if (hasFlush && hasStraight && isRoyal(sortedRanks)) {
            return "Scala Reale";
        }
        if (hasFlush && hasStraight) {
            return "Scala Colore";
        }
        if (hasFourOfAKind) {
            return "Poker";
        }
        if (hasFullHouse) {
            return "Full House";
        }
        if (hasFlush) {
            return "Colore";
        }
        if (hasStraight) {
            return "Scala";
        }
        if (hasThreeOfAKind) {
            return "Tris";
        }
        if (hasTwoPair) {
            return "Doppia Coppia";
        }
        if (hasPair) {
            Rank pairRank = rankCount.entrySet().stream().filter(e -> e.getValue() >= 2).findFirst().get().getKey();
            return "Coppia di " + pairRank;
        }

        Rank highCard = sortedRanks.get(0);
        return "Carta Alta (" + highCard + ")";
    }

    private boolean checkStraight(List<Rank> sortedRanks) {
        if (sortedRanks.size() < 5) return false;

        List<Integer> values = sortedRanks.stream().map(Rank::ordinal).distinct().sorted().toList();

        for (int i = 0; i <= values.size() - 5; i++) {
            if (values.get(i + 4) - values.get(i) == 4) {
                return true;
            }
        }

        if (values.contains(12) && values.contains(0) && values.contains(1) && values.contains(2) && values.contains(3)) {
            return true;
        }

        return false;
    }

    private boolean isRoyal(List<Rank> sortedRanks) {
        List<Integer> values = sortedRanks.stream().map(Rank::ordinal).toList();
        return values.contains(12) && values.contains(11) && values.contains(10) && values.contains(9) && values.contains(8);
    }
}
