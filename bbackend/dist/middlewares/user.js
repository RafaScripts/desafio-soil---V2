"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersConsults_1 = __importDefault(require("../consults/usersConsults"));
async function user_check(req, res, next) {
    const { authorization } = req.headers;
    try {
        if (!authorization)
            throw new Error('Access not authorized');
        const token = authorization.split(' ')[1];
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded)
            throw new Error('Access not authorized, but not decoded token');
        const user = await usersConsults_1.default.searchById(decoded.id);
        if (!user)
            throw new Error('Access not authorized, user does not exist');
        return next();
    }
    catch (e) {
        return res.status(401).json(e.message);
    }
}
exports.default = user_check;
