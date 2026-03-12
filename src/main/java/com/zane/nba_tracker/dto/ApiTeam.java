package com.zane.nba_tracker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ApiTeam {
    private Long id;
    private String city;
    private String name;
    @JsonProperty("full_name")
    private String fullName;
    private String abbreviation;
    private String conference;
    private String division;

    public Long getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public String getName() {
        return name;
    }

    public String getFullName() {
        return fullName;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public String getConference() {
        return conference;
    }

    public String getDivision() {
        return division;
    }

    public void setId(Long id) {
        this.id = id;
    } 

    public void setName(String name) {
        this.name = name;
    } 

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setAbbreviation(String abbriviation) {
        this.abbreviation = abbriviation;
    }

    public void setConference(String conference) {
        this.conference = conference;
    }

    public void setDivision(String division) {
        this.division = division;
    }
}
