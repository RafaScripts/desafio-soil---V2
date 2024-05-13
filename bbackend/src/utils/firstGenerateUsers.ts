import UsersConsults from "../consults/usersConsults";
import {Role} from "../models/user_model";
import bcrypt from "bcrypt";

export async function firstGenerateUsers(){
    let hashadmin = await bcrypt.hash('123456789', 8);
    let hashuser = await bcrypt.hash('123456789', 8);

    const adm = {
        name: 'jhon',
        email: 'admin2@admin2.com',
        password: hashadmin,
        role: Role['ADMIN']
    }

    const user = {
        name: 'jhon',
        email: 'user2@user2.com',
        password: hashuser,
    }

    let existAdm = await UsersConsults.exist(adm.email);

    if(existAdm > 0){
        console.log('Admin has been registred');
    }else{
        await UsersConsults.create(adm);
    }

    let existUser = await UsersConsults.exist(user.email);

    if(existUser > 0) {
        console.log('User has been registred');
    }else{
        await UsersConsults.create({...user, role: Role['USER']});
    }

}