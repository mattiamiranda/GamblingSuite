package com.gamblingsuite.controller;

import com.gamblingsuite.dto.BlackjackAdviceRequest;
import com.gamblingsuite.dto.BlackjackAdviceResponse;
import com.gamblingsuite.model.Card;
import com.gamblingsuite.model.Rank;
import com.gamblingsuite.model.Suit;
import com.gamblingsuite.service.BlackjackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/blackjack")
@CrossOrigin(origins = "*")
public class BlackjackController {

    private final BlackjackService blackjackService;

    public BlackjackController(BlackjackService blackjackService) {
        this.blackjackService = blackjackService;
    }

    @PostMapping("/advice")
    public ResponseEntity<BlackjackAdviceResponse> getAdvice(@RequestBody BlackjackAdviceRequest request) {
        return ResponseEntity.ok(blackjackService.getAdvice(request));
    }

    @GetMapping("/practice")
    public ResponseEntity<Map<String, Object>> getPracticeHand() {
        List<Card> playerCards = generateRandomHand(2);
        Card dealerCard = generateRandomCard();

        List<Card> allPracticeCards = new ArrayList<>(playerCards);
        allPracticeCards.add(dealerCard);

        Map<String, Object> response = new HashMap<>();
        response.put("playerCards", playerCards);
        response.put("dealerCard", dealerCard);
        response.put("usedCards", allPracticeCards);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateAnswer(@RequestBody Map<String, Object> request) {
        String action = (String) request.get("action");
        @SuppressWarnings("unchecked")
        List<Map<String, String>> playerCardsData = (List<Map<String, String>>) request.get("playerCards");
        @SuppressWarnings("unchecked")
        Map<String, String> dealerCardData = (Map<String, String>) request.get("dealerCard");

        List<Card> playerCards = new ArrayList<>();
        for (Map<String, String> cardData : playerCardsData) {
            playerCards.add(new Card(cardData.get("rank"), cardData.get("suit")));
        }
        Card dealerCard = new Card(dealerCardData.get("rank"), dealerCardData.get("suit"));

        BlackjackAdviceRequest adviceRequest = new BlackjackAdviceRequest();
        adviceRequest.setPlayerCards(playerCards);
        adviceRequest.setDealerCard(dealerCard);

        BlackjackAdviceResponse correctAction = blackjackService.getAdvice(adviceRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("correct", action.equalsIgnoreCase(correctAction.getAction()));
        response.put("correctAction", correctAction.getAction());
        response.put("reason", correctAction.getReason());

        return ResponseEntity.ok(response);
    }

    private List<Card> generateRandomHand(int count) {
        List<Card> hand = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            hand.add(generateRandomCard());
        }
        return hand;
    }

    private Card generateRandomCard() {
        Rank[] ranks = Rank.values();
        Suit[] suits = Suit.values();
        Rank rank = ranks[(int) (Math.random() * ranks.length)];
        Suit suit = suits[(int) (Math.random() * suits.length)];
        return new Card(rank, suit);
    }
}
