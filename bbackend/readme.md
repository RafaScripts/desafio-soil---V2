API SoGame - Soil desafio

API construida para o desafio da soil, com o intuito de criar um sistema de cadastro de jogos e usuários.

## Tecnologias utilizadas
- Node.js
- Express
- Postgres
- Docker
- Docker-compose
- Prisma
- Jest
- Swagger
- Typescript
- Prometeus Client
- faker-js
- bcrypt
- axios
- jsonwebtoken
- grafana
- prometeus

## Instalação
para executar o projeto é recomendavel ter o docker e docker-compose instalados na máquina.

### 1. Instalação e execução com docker

Clone o projeto do github

2. Entre na pasta do projeto

execute o comando a baixo para criar a subrede do docker para o projeto
``` bash
docker network create --driver bridge --subnet 172.20.0.0/16 soil-net
```

agora temos 2 opções para roda o projeto, a primeira ira mostrar todos os logs do projeto e a segunda ira rodar em segundo plano.

1. Para rodar o projeto com logs
``` bash
docker-compose up
```

2. Para rodar o projeto em segundo plano
``` bash
docker-compose up -d
```

### 2. Instalação e execução sem docker

Clone o projeto do github

para este tipo de instalação tenha em mente que precisara possuir o postgres instalado na máquina. e o grafana e prometeus precisarão ser instalados manualemnte

2. Entre na pasta do projeto

3. Instale as dependencias
``` bash
npm install
```

4. Crie um arquivo .env na raiz do projeto e adicione as variaveis de ambiente
``` bash
DATABASE_URL="postgresql://user:password@localhost:5432/soil"
PORT=3000
```

5. Execute o comando para rodar o projeto
``` bash
prisma generate

prisma migrate dev --name init
```

7. Execute o comando para rodar o projeto
``` bash
npm run dev
```

## Documentação
A documentação da API foi feita utilizando o swagger, para gerar automaticamente a documentação use o comando
``` bash
npm run autodocs
```

## Testes
Os testes foram feitos utilizando o jest, para rodar os testes use o comando
``` bash
npm run test
```

## Monitoramento
Em docker o monitoramento pode ser feito acessando o grafana em http://localhost:3003, e o prometeus em http://localhost:9090

Para estes é nescessario configurar os apontamentos de datasource e dashboards.

## Primeiro usuario

Para a primeira execução o codigo gera 2 primeiros usuarios sendo eles

Role User - usuario comum
``` Json
{
    "email": "user2@user2.com"
    password: "123456789"
}
```

e

Role Admin - usuario administrador
``` Json
{
    "email": "admin2@admin2.com"
    password: "123456789"
}
```

## Rotas
A documentação da API foi feita utilizando o swagger, para gerar automaticamente a documentação use o comando
``` bash
npm run autodocs
```

### parar o projeto

para desligar o projeto docker basta rodar o comando
``` bash
docker-compose down
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
