import express, {Request, Response} from 'express';
import client from "prom-client";
import cors from 'cors';
import routerUser from "./routes/routesUsers";
import routerGames from "./routes/routesGames";
import {firstGenerateUsers} from "./utils/firstGenerateUsers";
import * as path from "path";
import * as fs from "fs";

const app = express();

app.use(cors({origin: '*'}))

app.use(express.json());

app.use('/api/v1', routerUser);
app.use('/api/v1', routerGames);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

function startMetricsServer(){
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get('/metrics', async (req: Request, res: Response) => {
    try{

      res.set('Content-Type', client.register.contentType);
      return res.end(await client.register.metrics());

    }catch (e: any) {
      return res.status(500).end(e);
    }
  });

  app.listen(9100, () => {
    console.info('Metrics server is running on port 9100');
  });
}

/*
Função em testes ignorar
async function configureRoutes() {
  const routesFolder = path.join(__dirname, "routes");
  let files = fs.readdirSync(routesFolder);

  if (process.env.NODE_ENV === "production") {
    files = files.filter((file) => path.extname(file) === ".js");
  }

  files.forEach((file) => {
    const router = require(path.join(routesFolder, file)).default;
    const baseRoute = file.replace(/Router\.(ts|js)$/, "");
    this.app.use(`/api/${baseRoute}`, router);
  });
}
*/

app.listen(3000, async () => {

  await firstGenerateUsers();
  startMetricsServer();

  console.log('Server is running on port 3000');
});

export default app;