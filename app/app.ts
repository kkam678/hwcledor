import { Application, urlencoded, json } from 'express';
import Routes from './routes';
import * as bodyParser from "body-parser";

export default class Server {
  constructor(app: Application) {
    new Routes(app);
  }

  public config(app: Application): void {
    // const accessLogStream: WriteStream = fs.createWriteStream(
    //     path.join(__dirname, './logs/access.log'),
    //     { flags: 'a' }
    // );
    // app.use(morgan('combined', { stream: accessLogStream }));
    // app.use(bodyParser.json());
    // app.use(urlencoded({ extended: true }));
    // app.use(json());
    // app.use(helmet());
    // app.use(rateLimiter()); //  apply to all requests
    // app.use(unCoughtErrorHandler);
  }
}

process.on('beforeExit', function (err) {
  // winston.error(JSON.stringify(err));
  console.error(err);
});