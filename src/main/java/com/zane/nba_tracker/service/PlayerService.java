package com.zane.nba_tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.zane.nba_tracker.model.Player;
import com.zane.nba_tracker.repository.PlayerRepository;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    public List<Player> getAllPlayers() {
        List<Player> players = playerRepository.findAll();
        return players;
    }

    public Optional<Player> getPlayerById(Long id) {
        Optional<Player> playerId = playerRepository.findById(id);
        return playerId;
    }

    public Player savePlayer(Player player) {
        Player savedPlayer = playerRepository.save(player);
        return savedPlayer;
    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }
}
