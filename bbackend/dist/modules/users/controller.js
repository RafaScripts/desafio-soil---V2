"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.favoriteGame = exports.remove = exports.update = exports.createAdmin = exports.create = exports.list = void 0;
const usersConsults_1 = __importDefault(require("../../consults/usersConsults"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../../models/user_model");
require("dotenv/config");
async function list(req, res) {
    // #swagger.tags = ['users']
    /* #swagger.security = [{
           "bearerAuth": []
   }] */
    /* #swagger.responses[200] = {
            description: "Lista de todos os usuarios.",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/userList"
                    }
                }
            }
        }
    */
    /* #swagger.responses[500] = {
            description: "Error",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/errorUserList"
                    }
                }
            }
        }
    */
    try {
        let users = await usersConsults_1.default.index();
        return res.status(200).json(users);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.list = list;
async function create(req, res) {
    // #swagger.tags = ['users']
    /* #swagger.security = [{
           "bearerAuth": []
   }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userCreate"
                    }
                }
            }
        }
    */
    /* #swagger.responses[201] = {
           description: "resultado apos criar um usuario."
       }
   */
    /* #swagger.responses[500] = {
            description: "Error",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/errorUserList"
                    }
                }
            }
        }
    */
    const { name, email, password } = req.body;
    try {
        const exist = await usersConsults_1.default.exist(email);
        if (exist > 0)
            throw new Error('User has been registred');
        const password_hash = await bcrypt_1.default.hash(password, 8);
        const user = await usersConsults_1.default.create({ name, email, password: password_hash, role: user_model_1.Role['USER'] });
        return res.status(201).json('User Created');
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.create = create;
async function createAdmin(req, res) {
    // #swagger.tags = ['users']
    /* #swagger.security = [{
           "bearerAuth": []
   }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userCreate"
                    }
                }
            }
        }
    */
    /* #swagger.responses[201] = {
           description: "resultado apos criar um usuario."
       }
   */
    /* #swagger.responses[500] = {
            description: "Error",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/errorUserList"
                    }
                }
            }
        }
    */
    const { name, email, password } = req.body;
    try {
        const exist = await usersConsults_1.default.exist(email);
        if (exist > 0)
            throw new Error('User has been registred');
        const password_hash = await bcrypt_1.default.hash(password, 8);
        const user = await usersConsults_1.default.create({ name, email, password: password_hash, role: user_model_1.Role['ADMIN'] });
        return res.status(201).json('User Created');
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.createAdmin = createAdmin;
async function update(req, res) {
    // #swagger.tags = ['users']
    /* #swagger.security = [{
           "bearerAuth": []
   }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userUpdate"
                    }
                }
            }
        }
    */
    /* #swagger.responses[500] = {
            description: "Error",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/errorUserList"
                    }
                }
            }
        }
    */
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const password_hash = await bcrypt_1.default.hash(password, 8);
        const user = await usersConsults_1.default.update(id, { name, email, password: password_hash });
        return res.status(203).json('User Updated');
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.update = update;
async function remove(req, res) {
    // #swagger.tags = ['users']
    /* #swagger.security = [{
           "bearerAuth": []
   }] */
    const { id } = req.params;
    try {
        await usersConsults_1.default.delete(id);
        return res.status(204).send();
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.remove = remove;
async function favoriteGame(req, res) {
    // #swagger.tags = ['users']
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/favoriteGame"
                    }
                }
            }
        }
    */
    const { idGame, idUser } = req.body;
    try {
        await usersConsults_1.default.favoriteGame(idGame, idUser);
        return res.status(201).json('Game favorited');
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.favoriteGame = favoriteGame;
async function signin(req, res) {
    // #swagger.tags = ['users']
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/signin"
                    }
                }
            }
        }
    */
    const { email, password } = req.body;
    try {
        const user = await usersConsults_1.default.searchByEmail(email);
        if (!user)
            throw new Error('User not found');
        const passwordMatch = await bcrypt_1.default.compare(password, user.password_hash);
        if (!passwordMatch)
            throw new Error('Password incorrect');
        let token = jsonwebtoken_1.default.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, process.env.SECRET || 'secret', {
            expiresIn: '1d'
        });
        const data = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: token
        };
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
exports.signin = signin;
