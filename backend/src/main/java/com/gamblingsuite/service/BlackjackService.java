package com.gamblingsuite.service;

import com.gamblingsuite.dto.BlackjackAdviceRequest;
import com.gamblingsuite.dto.BlackjackAdviceResponse;
import com.gamblingsuite.model.Card;
import com.gamblingsuite.model.Rank;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlackjackService {

    public BlackjackAdviceResponse getAdvice(BlackjackAdviceRequest request) {
        List<Card> playerCards = request.getPlayerCards();
        Card dealerCard = request.getDealerCard();

        if (playerCards == null || playerCards.size() < 2 || dealerCard == null) {
            return new BlackjackAdviceResponse("INVALID", "Inserisci 2 carte tue e 1 carta del dealer");
        }

        int dealerValue = dealerCard.getRank().getValue();
        boolean isSoft = hasAce(playerCards) && calculateSoftTotal(playerCards) <= 21;
        int hardTotal = calculateHardTotal(playerCards);
        boolean isPair = isPair(playerCards);
        Rank pairRank = isPair ? playerCards.get(0).getRank() : null;

        if (isPair) {
            return getPairAdvice(pairRank, dealerValue);
        }

        if (isSoft) {
            return getSoftHandAdvice(hardTotal, dealerValue);
        }

        return getHardHandAdvice(hardTotal, dealerValue);
    }

    private boolean hasAce(List<Card> cards) {
        return cards.stream().anyMatch(c -> c.getRank() == Rank.ACE);
    }

    private int calculateSoftTotal(List<Card> cards) {
        int total = 0;
        int aces = 0;
        for (Card card : cards) {
            if (card.getRank() == Rank.ACE) {
                aces++;
            } else {
                total += card.getRank().getValue();
            }
        }
        for (int i = 0; i < aces; i++) {
            if (total + 11 <= 21) {
                total += 11;
            } else {
                total += 1;
            }
        }
        return total;
    }

    private int calculateHardTotal(List<Card> cards) {
        int total = 0;
        int aces = 0;
        for (Card card : cards) {
            if (card.getRank() == Rank.ACE) {
                aces++;
            } else {
                total += card.getRank().getValue();
            }
        }
        for (int i = 0; i < aces; i++) {
            total += 1;
        }
        return total;
    }

    private boolean isPair(List<Card> cards) {
        return cards.size() == 2 && cards.get(0).getRank() == cards.get(1).getRank();
    }

    private BlackjackAdviceResponse getPairAdvice(Rank rank, int dealerValue) {
        switch (rank) {
            case ACE:
            case EIGHT:
                return new BlackjackAdviceResponse("SPLIT", "Sempre SPLIT con A,A o 8,8");
            case TWO:
            case THREE:
            case SEVEN:
                if (dealerValue >= 2 && dealerValue <= 7) {
                    return new BlackjackAdviceResponse("SPLIT", "Coppia bassa contro dealer debole");
                }
                return new BlackjackAdviceResponse("HIT", "Coppia bassa contro dealer forte");
            case SIX:
                if (dealerValue >= 2 && dealerValue <= 6) {
                    return new BlackjackAdviceResponse("SPLIT", "6,6 contro dealer debole");
                }
                return new BlackjackAdviceResponse("HIT", "6,6 contro dealer forte");
            case FOUR:
                if (dealerValue == 5 || dealerValue == 6) {
                    return new BlackjackAdviceResponse("HIT", "4,4 solo con dealer 5 o 6");
                }
                return new BlackjackAdviceResponse("HIT", "4,4 altrimenti HIT");
            case NINE:
                if (dealerValue >= 2 && dealerValue <= 6) {
                    return new BlackjackAdviceResponse("STAND", "9,9 contro dealer debole");
                }
                if (dealerValue == 7 || dealerValue == 8) {
                    return new BlackjackAdviceResponse("STAND", "9,9 contro dealer medio");
                }
                return new BlackjackAdviceResponse("SPLIT", "9,9 contro 7 o 8 o A");
            case TEN:
            case JACK:
            case QUEEN:
            case KING:
                return new BlackjackAdviceResponse("STAND", "Coppia di 10 vale 20, STAND");
            default:
                return new BlackjackAdviceResponse("STAND", "Consiglio standard");
        }
    }

    private BlackjackAdviceResponse getSoftHandAdvice(int total, int dealerValue) {
        if (total >= 19 || (total == 18 && dealerValue <= 8)) {
            return new BlackjackAdviceResponse("STAND", "ManO morbida forte");
        }
        if (total == 18 && dealerValue >= 9) {
            return new BlackjackAdviceResponse("HIT", "18 morbido contro carta alta del dealer");
        }
        if (total <= 17) {
            if (total >= 15) {
                if (dealerValue >= 6 && total >= 17) {
                    return new BlackjackAdviceResponse("DOUBLE", "Carta del dealer bassa, DOUBLE");
                }
                if (dealerValue >= 4 && total >= 18) {
                    return new BlackjackAdviceResponse("DOUBLE", "Ottima opportunità per DOUBLE");
                }
            }
            return new BlackjackAdviceResponse("HIT", "ManO morbida debole, HIT");
        }
        return new BlackjackAdviceResponse("HIT", "Consiglio standard");
    }

    private BlackjackAdviceResponse getHardHandAdvice(int total, int dealerValue) {
        if (total >= 17) {
            return new BlackjackAdviceResponse("STAND", "Totale >= 17, STAND");
        }
        if (total == 16) {
            if (dealerValue >= 2 && dealerValue <= 6) {
                return new BlackjackAdviceResponse("STAND", "16 contro dealer debole, STAND");
            }
            return new BlackjackAdviceResponse("HIT", "16 contro dealer forte, HIT");
        }
        if (total == 15) {
            if (dealerValue >= 2 && dealerValue <= 6) {
                return new BlackjackAdviceResponse("STAND", "15 contro dealer debole, STAND");
            }
            return new BlackjackAdviceResponse("HIT", "15 contro dealer forte, HIT");
        }
        if (total == 14) {
            if (dealerValue >= 2 && dealerValue <= 6) {
                return new BlackjackAdviceResponse("STAND", "14 contro dealer debole");
            }
            return new BlackjackAdviceResponse("HIT", "14 contro dealer forte");
        }
        if (total == 13) {
            if (dealerValue >= 2 && dealerValue <= 6) {
                return new BlackjackAdviceResponse("STAND", "13 contro dealer debole");
            }
            return new BlackjackAdviceResponse("HIT", "13 contro dealer forte");
        }
        if (total == 12) {
            if (dealerValue >= 4 && dealerValue <= 6) {
                return new BlackjackAdviceResponse("STAND", "12 contro dealer debole");
            }
            return new BlackjackAdviceResponse("HIT", "12 altrimenti HIT");
        }
        if (total == 11) {
            return new BlackjackAdviceResponse("DOUBLE", "11 = DOUBLE se possibile");
        }
        if (total == 10) {
            if (dealerValue <= 9) {
                return new BlackjackAdviceResponse("DOUBLE", "10 = DOUBLE");
            }
            return new BlackjackAdviceResponse("HIT", "10 contro Asso o 10");
        }
        if (total == 9) {
            if (dealerValue >= 3 && dealerValue <= 6) {
                return new BlackjackAdviceResponse("DOUBLE", "9 = DOUBLE");
            }
            return new BlackjackAdviceResponse("HIT", "9 altrimenti HIT");
        }
        if (total <= 8) {
            return new BlackjackAdviceResponse("HIT", "Totale basso, HIT");
        }
        return new BlackjackAdviceResponse("HIT", "Consiglio standard");
    }
}
