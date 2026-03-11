package com.zane.nba_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.zane.nba_tracker.model.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    
}