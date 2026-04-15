package com.gamblingsuite.dto;

public class PokerAdviceResponse {
    private String action;
    private String confidence;
    private String reason;

    public PokerAdviceResponse() {}

    public PokerAdviceResponse(String action, String confidence, String reason) {
        this.action = action;
        this.confidence = confidence;
        this.reason = reason;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getConfidence() {
        return confidence;
    }

    public void setConfidence(String confidence) {
        this.confidence = confidence;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
