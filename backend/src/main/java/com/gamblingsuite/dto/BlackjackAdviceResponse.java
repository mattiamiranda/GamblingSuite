package com.gamblingsuite.dto;

public class BlackjackAdviceResponse {
    private String action;
    private String reason;

    public BlackjackAdviceResponse() {}

    public BlackjackAdviceResponse(String action, String reason) {
        this.action = action;
        this.reason = reason;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
