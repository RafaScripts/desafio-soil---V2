import {Request, Response} from "express";
import UsersConsults from "../../consults/usersConsults";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Role} from "../../models/user_model";
import 'dotenv/config';

export async function list(req: Request, res: Response){
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

        let users = await UsersConsults.index();

        return res.status(200).json(users);

    }catch (e: any) {
        return res.status(500).json({message: e.message})
    }
}

export async function create(req: Request, res: Response){
    // #swagger.tags = ['users']


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

    const {name, email, password} = req.body;

    try {

        const exist = await UsersConsults.exist(email);

        if(exist > 0) throw new Error('User has been registred');

        const password_hash = await bcrypt.hash(password, 8);

        const user = await UsersConsults.create({name, email, password: password_hash, role: Role['USER']});

        return res.status(201).json('User Created');

    }catch (e: any) {
        return res.status(500).json({message: e.message})
    }
}

export async function createAdmin(req: Request, res: Response){
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

    const {name, email, password} = req.body;

    try {

        const exist = await UsersConsults.exist(email);

        if(exist > 0) throw new Error('User has been registred');

        const password_hash = await bcrypt.hash(password, 8);

        const user = await UsersConsults.create({name, email, password: password_hash, role: Role['ADMIN']});

        return res.status(201).json('User Created');

    }catch (e: any) {
        return res.status(500).json({message: e.message})
    }
}

export async function update(req: Request, res: Response){
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

    const {id} = req.params;
    const {name, email, password} = req.body;

    try {

        const password_hash = await bcrypt.hash(password, 8);

        const user = await UsersConsults.update(id, {name, email, password: password_hash});

        return res.status(203).json('User Updated');

    }catch (e: any) {
        return res.status(500).json({message: e.message})
    }
}

export async function remove(req: Request, res: Response){
    // #swagger.tags = ['users']

    /* #swagger.security = [{
           "bearerAuth": []
   }] */

    const {id} = req.params;

    try {

        await UsersConsults.delete(id);

        return res.status(204).send();

    }catch (e: any) {
        return res.status(500).json({message: e.message})
    }
}

export async function favoriteGame(req: Request, res: Response){
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

    const {idGame, idUser, platform} = req.body;

    try {

        const exist = await UsersConsults.existFavorite(idGame, idUser);

        if(exist > 0) throw new Error('Game has been favorited');

        await UsersConsults.favoriteGame(idGame, idUser, platform);

        return res.status(201).json('Game favorited');
    }catch (e: any) {
        return res.status(500).json({message: e.message})
    }
}

export async function signin(req: Request, res: Response){
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

    const {email, password} = req.body;

    try {

        const user = await UsersConsults.searchByEmail(email);

        if(!user) throw new Error('User not found');

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if(!passwordMatch) throw new Error('Password incorrect');

        let token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }, process.env.SECRET || 'secret',
            {
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
        }

        return res.status(200).json(data);

    }catch (e: any) {
        return res.status(500).json({message: e.message})
    }
}