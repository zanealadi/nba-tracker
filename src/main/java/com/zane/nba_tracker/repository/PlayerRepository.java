package com.zane.nba_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.zane.nba_tracker.model.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Query(value = "SELECT * FROM players WHERE team_name = ?1", nativeQuery = true)
    List<Player> findByTeamName(String teamName);

    @Query(value = "SELECT * FROM players WHERE position = ?1", nativeQuery = true)
    List<Player> findByPosition(String position);

    @Query(value = "SELECT * FROM players WHERE jersey_number = ?1", nativeQuery = true)
    List<Player> findByJerseyNumber(Integer jerseyNumber);
}