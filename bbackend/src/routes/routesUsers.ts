import express from "express";

import {list, create, update, remove, favoriteGame, signin, createAdmin} from "../modules/users/controller";
import admin_check from "../middlewares/admin";
import user_check from "../middlewares/user";


const routerUser = express.Router();

//Users Routes
routerUser.post('/users/login', signin);
routerUser.post('/users/create', create);
routerUser.put('/users/update/:id', user_check, update);
routerUser.post('/users/favorite/create', user_check, favoriteGame);


//Admin
routerUser.get('/users/list', admin_check, list);
routerUser.post('/admin/users/create', admin_check, createAdmin);
routerUser.delete('/users/remove/:id', admin_check, remove);

export default routerUser;