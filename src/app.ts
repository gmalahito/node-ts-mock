import express from 'express';
import {Routes} from './routes';
import bodyParser from 'body-parser';
import layouts from 'express-ejs-layouts';
import session from 'express-session';

class App {
    public app: express.Application;
    public router: Routes = new Routes();

    constructor() 
    {
        this.app = express();
        this.mountConfig();
        this.mountRoutes();
    }

    private mountConfig(): void
    {
        // EJS config
        this.app.use(layouts);
        this.app.set('view engine', 'ejs');

        // Body parser config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Express session config
        this.app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }))
    }

    private mountRoutes() : void
    {
        this.router.routes(this.app);
    }
}

export default new App().app;