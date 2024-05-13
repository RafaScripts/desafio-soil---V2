"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../modules/users/controller");
const admin_1 = __importDefault(require("../middlewares/admin"));
const user_1 = __importDefault(require("../middlewares/user"));
const routerUser = express_1.default.Router();
//Users Routes
routerUser.post('/users/login', controller_1.signin);
routerUser.post('/users/create', controller_1.create);
routerUser.put('/users/update/:id', user_1.default, controller_1.update);
routerUser.post('/users/favorite/create', user_1.default, controller_1.favoriteGame);
//Admin
routerUser.get('/users/list', admin_1.default, controller_1.list);
routerUser.post('/admin/users/create', admin_1.default, controller_1.createAdmin);
routerUser.delete('/users/remove/:id', admin_1.default, controller_1.remove);
exports.default = routerUser;
