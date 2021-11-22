"use strict";
//asynchronous version works faster but requires adding await statement
//before calling generateTeams function in the test file
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTeams = void 0;
var generateTeams = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var BinarySearchTree, lineReader, users, firstLine, teamOne, teamTwo;
    return __generator(this, function (_a) {
        BinarySearchTree = require('@datastructures-js/binary-search-tree').BinarySearchTree;
        lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filePath)
        });
        users = new BinarySearchTree();
        firstLine = true;
        lineReader.on('line', function (line) {
            var stringArr = line.split(/\s+/);
            if (!firstLine) {
                var key = -parseInt(stringArr[1], 10);
                var node = users.find(key);
                if (node) {
                    var elem = node.getValue();
                    elem.push({ name: stringArr[0], time: stringArr[1], type: stringArr[2] });
                    users.insert(key, elem);
                }
                if (!node) {
                    users.insert(key, [{ name: stringArr[0], time: stringArr[1], type: stringArr[2] }]);
                }
            }
            else {
                firstLine = false;
            }
        });
        teamOne = [];
        teamTwo = [];
        return [2 /*return*/, new Promise(function (resolve, reject) { return lineReader.on('close', function () {
                // users.traverseInOrder(node =>{
                //     const arr= node.getValue()
                //     console.log(arr)
                // })
                console.log('close');
                var find = function (type, condition) {
                    var length = type * 3;
                    try {
                        users.traverseInOrder(function (node) {
                            var arr = node.getValue();
                            for (var i = 0; i < arr.length; i++) {
                                if (condition) {
                                    if (arr[i].type === type.toString()) {
                                        teamOne.push(arr[i].name);
                                    }
                                    if (teamOne.length === length) {
                                        throw new Error("finding 3 users with " + type + " done");
                                    }
                                }
                                else {
                                    if (arr[i].type === type.toString() && !teamOne.includes(arr[i].name)) {
                                        teamTwo.push(arr[i].name);
                                    }
                                    if (teamTwo.length === length) {
                                        throw new Error("finding 3 users with " + type + " done");
                                    }
                                }
                            }
                        });
                    }
                    catch (error) {
                        console.log(error.message);
                    }
                };
                for (var i = 1; i <= 3; i++) {
                    find(i, true);
                    find(i, false);
                }
                console.log(teamOne);
                console.log(teamTwo);
                console.log('end');
                resolve({
                    team1: teamOne,
                    team2: teamTwo
                });
            }); })];
    });
}); };
exports.generateTeams = generateTeams;
