package com.zane.nba_tracker.dto;

public class PlayerStats {
    private String playerId;
    private String playerName;
    private String position;
    private Integer age;
    private Integer games;
    private Integer points;
    private Integer assists;
    private Integer totalRb;
    private Integer blocks;
    private Integer steals;
    private String team;
    private Integer season;
    
    public String getPlayerId() {
        return playerId;
    }
    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }
    public String getPlayerName() {
        return playerName;
    }
    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }
    public String getPosition() {
        return position;
    }
    public void setPosition(String position) {
        this.position = position;
    }
    public Integer getAge() {
        return age;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
    public Integer getGames() {
        return games;
    }
    public void setGames(Integer games) {
        this.games = games;
    }
    public Integer getPoints() {
        return points;
    }
    public void setPoints(Integer points) {
        this.points = points;
    }
    public Integer getAssists() {
        return assists;
    }
    public void setAssists(Integer assists) {
        this.assists = assists;
    }
    public Integer getTotalRb() {
        return totalRb;
    }
    public void setTotalRb(Integer totalRb) {
        this.totalRb = totalRb;
    }
    public Integer getBlocks() {
        return blocks;
    }
    public void setBlocks(Integer blocks) {
        this.blocks = blocks;
    }
    public Integer getSteals() {
        return steals;
    }
    public void setSteals(Integer steals) {
        this.steals = steals;
    }
    public String getTeam() {
        return team;
    }
    public void setTeam(String team) {
        this.team = team;
    }
    public Integer getSeason() {
        return season;
    }
    public void setSeason(Integer season) {
        this.season = season;
    }


}
