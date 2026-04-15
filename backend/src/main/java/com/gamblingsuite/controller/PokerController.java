package com.gamblingsuite.controller;

import com.gamblingsuite.dto.PokerAdviceRequest;
import com.gamblingsuite.dto.PokerAdviceResponse;
import com.gamblingsuite.model.Card;
import com.gamblingsuite.model.Rank;
import com.gamblingsuite.model.Suit;
import com.gamblingsuite.service.PokerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/poker")
@CrossOrigin(origins = "*")
public class PokerController {

    private final PokerService pokerService;

    public PokerController(PokerService pokerService) {
        this.pokerService = pokerService;
    }

    @PostMapping("/advice")
    public ResponseEntity<PokerAdviceResponse> getAdvice(@RequestBody PokerAdviceRequest request) {
        return ResponseEntity.ok(pokerService.getAdvice(request));
    }

    @GetMapping("/hands-ranking")
    public ResponseEntity<List<String>> getHandsRanking() {
        List<String> ranking = new ArrayList<>();
        ranking.add("1. Scala Reale (Royal Flush)");
        ranking.add("2. Scala Colore (Straight Flush)");
        ranking.add("3. Poker (Four of a Kind)");
        ranking.add("4. Full House (Full House)");
        ranking.add("5. Colore (Flush)");
        ranking.add("6. Scala (Straight)");
        ranking.add("7. Tris (Three of a Kind)");
        ranking.add("8. Doppia Coppia (Two Pair)");
        ranking.add("9. Coppia (One Pair)");
        ranking.add("10. Carta Alta (High Card)");
        return ResponseEntity.ok(ranking);
    }
}
