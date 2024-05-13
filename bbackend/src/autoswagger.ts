import swaggerAutogen from 'swagger-autogen';
import moment from 'moment';

const outputFile = '../endpoints.json';

const doc = {
    info: {
        version: '1.0.0',            // by default: '1.0.0'
        title: 'API SOIL DESAFIO',              // by default: 'REST API'
        description: 'Desafio programatico soil'         // by default: ''
    },
    servers: [
        {
            url: 'http://localhost:3000',              // by default: 'http://localhost:3000'
            description: 'Development'       // by default: ''
        },
        {
            url: 'https://macbook-pro-de-lais.tail5dcec.ts.net',
            description: 'tunnel developer'
        },
        {
            url: 'http://100.70.109.120:3000',
            description: 'Tailscale'
        }
    ],
    tags: [                   // by default: empty Array
        {
            name: 'users',             // Tag name
            description: 'Usuarios'       // Tag description
        },
        {
            name: 'games',             // Tag name
            description: 'Jogos'       // Tag description
        }
    ],
    components: {
        schemas: {
            userList: [{
                name: 'John Doe',
                email: 'example@example.com',
                roles: 'ADMIN',
                createdAt: moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'),
                updatedAt: moment(Date.now()).format('DD/MM/YYYY HH:mm:ss')
            }],
            errorUserList: {
                error: 'undefined'
            },
            userCreate: {
                name: 'John Doe',
                email: 'example@example.com',
                password: '12345678'
            },
            userUpdate: {
                name: 'John Doe',
                email: 'example@example.com',
                password: '12345678'
            },
            createGame: {
                name: 'Game',
                platform: 'pc',
                thumbnail: 'http://example.com',
                rate: 3.5
            },
            favoriteGame: {
                idGame: 'ed123ed',
                idUser: 'wd123wd'
            },
            signin: {
                email: 'user@user.com',
                password: 'user123'
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const endpointsFiles = ['./src/server.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);