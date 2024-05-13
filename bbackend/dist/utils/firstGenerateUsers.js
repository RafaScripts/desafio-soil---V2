"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstGenerateUsers = void 0;
const usersConsults_1 = __importDefault(require("../consults/usersConsults"));
const user_model_1 = require("../models/user_model");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function firstGenerateUsers() {
    let hashadmin = await bcrypt_1.default.hash('admin', 8);
    let hashuser = await bcrypt_1.default.hash('user123', 8);
    const adm = {
        name: 'jhon',
        email: 'admin2@admin2.com',
        password: hashadmin,
        role: user_model_1.Role['ADMIN']
    };
    const user = {
        name: 'jhon',
        email: 'user2@user2.com',
        password: hashuser,
    };
    let existAdm = await usersConsults_1.default.exist(adm.email);
    if (existAdm > 0) {
        console.log('Admin has been registred');
    }
    else {
        await usersConsults_1.default.create(adm);
    }
    let existUser = await usersConsults_1.default.exist(user.email);
    if (existUser > 0) {
        console.log('User has been registred');
    }
    else {
        await usersConsults_1.default.create({ ...user, role: user_model_1.Role['USER'] });
    }
}
exports.firstGenerateUsers = firstGenerateUsers;
