package com.zane.nba_tracker.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import com.zane.nba_tracker.dto.ApiResponse;
import com.zane.nba_tracker.dto.StatsResponse;

@Service
public class NbaApiService {
    @Value("${balldontlie.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "https://api.balldontlie.io/nba/v1/";
    private final String NBA_BASE_URL = "https://api.server.nbaapi.com/api/";

    public ApiResponse searchPlayers(String name) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = BASE_URL + "/players?search=" + name;
        ResponseEntity<ApiResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, ApiResponse.class);
        return response.getBody();
    }

    public ApiResponse getPlayersByTeam(Integer teamId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = BASE_URL + "/players?team_ids[]=" + teamId;
        ResponseEntity<ApiResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, ApiResponse.class);
        return response.getBody();
    }

    public StatsResponse getPlayerStats(String playerName, Integer season) {
        String url = NBA_BASE_URL + "playertotals?playerName=" + playerName +"&season=" + season;
         ResponseEntity<StatsResponse> response = restTemplate.exchange(url, HttpMethod.GET, HttpEntity.EMPTY, StatsResponse.class);
         return response.getBody();
    }
}
