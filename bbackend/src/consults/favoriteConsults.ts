import prisma from "../database";
import {Game, GameCreate} from "../models/favorite_model";


class GamesConsults{

    index(){
        return prisma.game.findMany();
    }

    searchById(id: string){
        return prisma.game.findUnique({
            where: {
                id: id
            }
        });
    }

    findByName(name: string){
        return prisma.game.findMany({
            where: {
                name: name
            }
        });
    }

    findWithUsers(){

        //@ts-ignore
        return prisma.game.findMany({
            relationLoadStrategy: 'join',
            include: {
                users: {
                    include: {
                        user: true
                    }
                }
            }
        });

    }

    create(data: GameCreate){
        return prisma.game.create({
            data: {
                name: data.name,
                thumbnail: data.thumbnail,
                platform: data.platform,
                rate: data.rate
            }
        })
    }

    exist(name: string){
        return prisma.game.count({
            where: {
                name: name
            }
        });
    }

    update(id: string, data: GameCreate){
        return prisma.game.update({
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

    delete(id: string){
        return prisma.game.delete({
            where: {
                id: id
            }
        });
    }

    removeFavorite(idFavorite: string){
        return prisma.userFavoriteGame.delete({
            where:{
                id: idFavorite
            }
        });
    }
}

export default new GamesConsults;