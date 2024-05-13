"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.findGamesOfUser = exports.findWithUsers = exports.searchById = exports.searchGame = exports.create = exports.list = void 0;
const favoriteConsults_1 = __importDefault(require("../../consults/favoriteConsults"));
const rawdb_1 = __importDefault(require("../rawdb/rawdb"));
const usersConsults_1 = __importDefault(require("../../consults/usersConsults"));
async function list(req, res) {
    // #swagger.tags = ['games']
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    try {
        const games = await favoriteConsults_1.default.index();
        return res.status(200).json(games);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
exports.list = list;
async function create(req, res) {
    // #swagger.tags = ['games']
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createGame"
                    }
                }
            }
        }
    */
    /* #swagger.responses[200] = {
            description: "jogo cadastrado"
        }
    */
    const { name, thumbnail, rate, platform, idUser } = req.body;
    try {
        const game = await favoriteConsults_1.default.create({ name, thumbnail, rate, platform });
        if (idUser) {
            await usersConsults_1.default.favoriteGame(idUser, game.id);
        }
        return res.status(201).json(game);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
exports.create = create;
async function searchGame(req, res) {
    // #swagger.tags = ['games']
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    /* #swagger.parameters['game'] = {
            in: 'query',
            required: true,
            type: 'string'
        }
    */
    try {
        const { game } = req.query;
        const games = await rawdb_1.default.getGames(game);
        return res.status(200).json(games);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
exports.searchGame = searchGame;
async function searchById(req, res) {
    // #swagger.tags = ['games']
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    /* #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'string'
        }
    */
    try {
        const { id } = req.params;
        const game = await favoriteConsults_1.default.searchById(id);
        return res.status(200).json(game);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
exports.searchById = searchById;
async function findWithUsers(req, res) {
    // #swagger.tags = ['games']
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    try {
        const games = await favoriteConsults_1.default.findWithUsers();
        return res.status(200).json(games);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
exports.findWithUsers = findWithUsers;
async function findGamesOfUser(req, res) {
    // #swagger.tags = ['games']
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    /* #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'string'
        }

     */
    const { id } = req.params;
    try {
        const games = await usersConsults_1.default.listAllFavoriteGames(id);
        return res.status(200).json(games);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
exports.findGamesOfUser = findGamesOfUser;
async function updateGame(req, res) {
    // #swagger.tags = ['games']
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    /* #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'string'
        }
    */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createGame"
                    }
                }
            }
        }
    */
    const { id } = req.params;
    const { name, thumbnail, rate } = req.body;
    try {
        const game = await favoriteConsults_1.default.update(id, { name, thumbnail, rate });
        return res.status(203).json('Game Updated');
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.updateGame = updateGame;
async function deleteGame(req, res) {
    // #swagger.tags = ['games']
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    /* #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'string'
        }
    */
    const { id } = req.params;
    try {
        await favoriteConsults_1.default.delete(id);
        return res.status(203).json('Game Deleted');
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.deleteGame = deleteGame;
