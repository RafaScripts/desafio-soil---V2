"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../modules/favorites/controller");
const admin_1 = __importDefault(require("../middlewares/admin"));
const user_1 = __importDefault(require("../middlewares/user"));
const routerGames = express_1.default.Router();
//Users Routes
routerGames.get('/games/list', user_1.default, controller_1.list);
routerGames.post('/games/create', user_1.default, controller_1.create);
routerGames.get('/games/search', user_1.default, controller_1.searchGame);
routerGames.get('/games/search/:id', user_1.default, controller_1.searchById);
routerGames.get('/games/listbyid/:id', user_1.default, controller_1.findGamesOfUser);
//Admin Routes
routerGames.get('/games/findWithUsers', admin_1.default, controller_1.findWithUsers);
routerGames.put('/games/update/:id', admin_1.default, controller_1.updateGame);
routerGames.delete('/games/delete/:id', admin_1.default, controller_1.deleteGame);
exports.default = routerGames;
