package com.zane.nba_tracker.dto;

import java.util.List;

public class ApiResponse {
    private List<ApiPlayer> data;

    public List<ApiPlayer> getData() {
        return data;
    }

    public void setData(List<ApiPlayer> data) {
        this.data = data;
    }

    
}
