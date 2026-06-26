package com.zane.nba_tracker.dto;
import java.util.List;

public class StatsResponse {
    private List<PlayerStats> data;

    public List<PlayerStats> getData() {
        return data;
    }

    public void setData(List<PlayerStats> data) {
        this.data = data;
    }
}
