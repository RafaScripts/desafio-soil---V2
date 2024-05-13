"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesConsults {
    index() {
        return database_1.default.game.findMany();
    }
    searchById(id) {
        return database_1.default.game.findUnique({
            where: {
                id: id
            }
        });
    }
    findWithUsers() {
        return database_1.default.game.findMany({
            relationLoadStrategy: 'join',
            include: {
                users: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
    }
    create(data) {
        return database_1.default.game.create({
            data: {
                name: data.name,
                thumbnail: data.thumbnail,
                rate: data.rate
            }
        });
    }
    update(id, data) {
        return database_1.default.game.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                thumbnail: data.thumbnail,
                rate: data.rate
            }
        });
    }
    delete(id) {
        return database_1.default.game.delete({
            where: {
                id: id
            }
        });
    }
}
exports.default = new GamesConsults;
