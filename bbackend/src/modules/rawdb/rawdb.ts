import api from "../../service/rawDB";
import axios from 'axios';
class rawDB{
    private apiKey: string;

    constructor() {
        this.apiKey = 'a194c07e4a3440cfb69486843959302a';
    }

    async getGames(game: string){
        const response = await api.get(`/games?key=${this.apiKey}&search=${encodeURIComponent(game)}`);
        return response.data;
    }

}

export default new rawDB;