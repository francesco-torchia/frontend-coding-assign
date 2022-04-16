import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routers } from './routers';
import { CONFIG } from './lib/config';
import { DB } from './database/db';
import { log } from './lib/log';
import { SERVER } from './lib/server';
import { ErrorController } from './controllers/error.controller';

SERVER.init();

const app = express();

app.use(cors());

/** Add Parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Add Server logger */
app.use(morgan(CONFIG.app.httpLogLevel));

/** Add Routes */
app.use(`/${CONFIG.app.apiVersion}/`, routers);

/** Add error handlers */
app.use(ErrorController.handler);

/** Server start */
DB.Ready.then(() => {

  const { hostname, port } = CONFIG.app;
  
  app.listen(port, hostname, () => {
    log.info('app.ready', 'Listening on http://%s:%s', hostname, port);
  });

});
