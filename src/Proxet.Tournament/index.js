"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateTeams_1 = require("./generateTeams");
var logTeam = function (teamName, players) {
    console.log("Team " + teamName + ":");
    players.forEach(function (player) {
        console.log(player);
    });
};
var teams = (0, generateTeams_1.generateTeams)("./wait-time.stat");
logTeam("Red", teams.team1);
logTeam("Blue", teams.team2);
console.log("Work is done");
