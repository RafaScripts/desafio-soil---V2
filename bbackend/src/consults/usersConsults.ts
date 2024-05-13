import prisma from "../database";
import {UserCreate} from "../models/user_model";

class UsersConsults{
    index(){
        return prisma.user.findMany({
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

    listAllFavoriteGames(id: string): any{
        //@ts-ignore
        return prisma.userFavoriteGame.findMany({
            relationLoadStrategy: 'join',
            where: {
                userId: id
            },
            include: {
                game: true
            }
        });
    }

    searchById(id: string){
        return prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    searchByEmail(email: string){
        return prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    exist(email: string){
        return prisma.user.count({
            where: {
                email: email
            }
        })
    }

    create(data: UserCreate){
        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password_hash: data.password,
                role: data.role
            }
        });
    }

    update(id: any, data: {name: string, email: string, password: string}){
        return prisma.user.update({
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

    delete(id: any){
        return prisma.user.delete({
            where: {
                id: id
            }
        });
    }

    favoriteGame(idGame: string, idUser: string, platform: string){
        return prisma.userFavoriteGame.create({
            data: {
                userId: idUser,
                gameId: idGame,
                platform: platform
            }
        });
    }

    existFavorite(idGame: string, idUser: string){
        return prisma.userFavoriteGame.count({
            where: {
                userId: idUser,
                gameId: idGame
            }
        });
    }
}

export default new UsersConsults;