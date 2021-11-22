"use strict";
//asynchronous version works faster but requires adding await statement
//before calling generateTeams function in the test file
//and changing
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTeams = void 0;
var generateTeams = function (filePath) {
    //creating line reader
    var lineByLine = require('n-readlines');
    var liner = new lineByLine(filePath);
    //creating bts
    var BinarySearchTree = require('@datastructures-js/binary-search-tree').BinarySearchTree;
    var users = new BinarySearchTree();
    //declaring line and firstLine variables
    var line;
    var firstLine = true;
    //reading file line by line
    while (line = liner.next()) {
        // splitting line to array
        var stringArr = line.toString().split(/\s+/);
        //checking whether we are reading first line
        if (!firstLine) {
            //creating key and checking if node exists
            var key = -parseInt(stringArr[1], 10);
            var node = users.find(key);
            if (node) {
                //if node already exits retrieving value and adding with the new one
                var elem = node.getValue();
                elem.push({ name: stringArr[0], time: stringArr[1], type: stringArr[2] });
                users.insert(key, elem);
            }
            if (!node) {
                // if not just adding new value
                users.insert(key, [{ name: stringArr[0], time: stringArr[1], type: stringArr[2] }]);
            }
        }
        else {
            firstLine = false;
        }
    }
    //creating team arrays
    var teamOne = [];
    var teamTwo = [];
    //creating find method to find 3 players each types
    var find = function (type, condition) {
        // setting length of the team array which will be after adding all users with current type
        var length = type * 3;
        //using try/catch block to get out of function
        try {
            //going through the tree
            users.traverseInOrder(function (node) {
                //retrieving array from the current node and walking through it
                var arr = node.getValue();
                for (var i = 0; i < arr.length; i++) {
                    // checking whether we should add to the first team or second
                    //teamOne
                    if (condition) {
                        //checking if we should add user and then adding
                        if (arr[i].type === type.toString()) {
                            teamOne.push(arr[i].name);
                        }
                        //checking whether we should go out of function and then doing it
                        //we're throwing an error to drop the function
                        //I know, it's not clean but it's the easiest and the most convenient way to do it
                        if (teamOne.length === length) {
                            throw new Error("finding 3 users with " + type + " of temOne done");
                        }
                        //teamTwo
                    }
                    else {
                        //checking if we should add user and then adding
                        if (arr[i].type === type.toString() && !teamOne.includes(arr[i].name)) {
                            teamTwo.push(arr[i].name);
                        }
                        //checking whether we should go out of function and then doing it
                        if (teamTwo.length === length) {
                            throw new Error("finding 3 users with " + type + " of teamTwo done");
                        }
                    }
                }
            });
            //catching our error
        }
        catch (error) {
            // console.log(error.message)
        }
    };
    //finding 3 players of each type for each team
    for (var i = 1; i <= 3; i++) {
        find(i, true);
        find(i, false);
    }
    //logging teams for ourselves
    console.log(teamOne);
    console.log(teamTwo);
    console.log('end');
    //returning values
    return ({
        team1: teamOne,
        team2: teamTwo
    });
};
exports.generateTeams = generateTeams;
// generateTeams('/src/Proxet.Tournament/wait-time.stat')
