package com.zane.nba_tracker.controller;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.zane.nba_tracker.dto.ApiPlayer;
import com.zane.nba_tracker.dto.ApiResponse;
import com.zane.nba_tracker.model.Player;
import com.zane.nba_tracker.service.NbaApiService;
import com.zane.nba_tracker.service.PlayerService;

@RestController
@RequestMapping("/api/players")
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @Autowired
    private NbaApiService nbaApiService;

    @GetMapping("/search")
    public ApiResponse searchPlayers(@RequestParam String name) {
        return nbaApiService.searchPlayers(name);
    }

    @GetMapping("/team/{teamId}")
    public ApiResponse getPlayersByTeam(@PathVariable Integer teamId) {
        return nbaApiService.getPlayersByTeam(teamId);
    }

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping("/{id}")
    public Optional<Player> getPlayerById(@PathVariable Long id) {
        return playerService.getPlayerById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
    }

    @PostMapping
    public Player createEndpoint(@RequestBody Player player) {
        return playerService.savePlayer(player);
    }

    @PostMapping("/favorites")
    public Player favEndpoint(@RequestBody ApiPlayer apiPlayer) {
        return playerService.saveFromApi(apiPlayer);
    }

    @GetMapping("/by-team")
    public List<Player> listPlayersByTeamName(@RequestParam String teamName) {
        List<Player> players = playerService.getPlayersByTeamName(teamName);
        return players;
    }

    @GetMapping("/by-position")
    public List<Player> listPlayersByPosition(@RequestParam String position) {
        List<Player> players = playerService.getPlayersByPosition(position);
        return players;
    }

    @GetMapping("/by-jersey")
    public List<Player> listPlayersByJerseyNumber(@RequestParam Integer jerseyNumber) {
        List<Player> players = playerService.getPlayersByJerseyNumber(jerseyNumber);
        return players;
    }
}
