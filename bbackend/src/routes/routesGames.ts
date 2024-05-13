import express from "express";

import {list, create, searchGame, searchById, deleteGame, updateGame, findWithUsers, findGamesOfUser} from "../modules/favorites/controller";
import admin_check from "../middlewares/admin";
import user_check from "../middlewares/user";

const routerGames = express.Router();

//Users Routes
routerGames.get('/games/list', user_check, list);
routerGames.post('/games/create', user_check, create);
routerGames.get('/games/search', user_check, searchGame);
routerGames.get('/games/search/:id', user_check, searchById);
routerGames.get('/games/listbyid/:id', user_check, findGamesOfUser);
routerGames.delete('/games/favorite/delete/:id', user_check, deleteGame);

//Admin Routes
routerGames.get('/games/findWithUsers', admin_check, findWithUsers);
routerGames.put('/games/update/:id', admin_check, updateGame);
routerGames.delete('/games/delete/:id', admin_check, deleteGame);

export default routerGames;