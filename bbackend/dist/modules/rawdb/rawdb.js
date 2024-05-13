"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rawDB_1 = __importDefault(require("../../service/rawDB"));
class rawDB {
    constructor() {
        this.apiKey = 'a194c07e4a3440cfb69486843959302a';
    }
    async getGames(game) {
        const response = await rawDB_1.default.get(`/games?key=${this.apiKey}&search=${encodeURIComponent(game)}`);
        return response.data;
    }
}
exports.default = new rawDB;
