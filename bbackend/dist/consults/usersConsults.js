"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UsersConsults {
    index() {
        return database_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password_hash: false,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
    listAllFavoriteGames(id) {
        return database_1.default.user.findUnique({
            relationLoadStrategy: 'join',
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true
            },
            include: {
                favoriteGames: {
                    include: {
                        game: {
                            select: {
                                id: true,
                                name: true,
                                thumbnail: true,
                                rate: true
                            }
                        }
                    }
                }
            }
        });
    }
    searchById(id) {
        return database_1.default.user.findUnique({
            where: {
                id: id
            }
        });
    }
    searchByEmail(email) {
        return database_1.default.user.findUnique({
            where: {
                email: email
            }
        });
    }
    exist(email) {
        return database_1.default.user.count({
            where: {
                email: email
            }
        });
    }
    create(data) {
        return database_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password_hash: data.password,
                role: data.role
            }
        });
    }
    update(id, data) {
        return database_1.default.user.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                email: data.email,
                password_hash: data.password
            }
        });
    }
    delete(id) {
        return database_1.default.user.delete({
            where: {
                id: id
            }
        });
    }
    favoriteGame(idGame, idUser) {
        return database_1.default.userFavoriteGame.create({
            data: {
                gameId: idGame,
                userId: idUser
            }
        });
    }
}
exports.default = new UsersConsults;
