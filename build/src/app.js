"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const express_session_1 = __importDefault(require("express-session"));
class App {
    constructor() {
        this.router = new routes_1.Routes();
        this.app = express_1.default();
        this.mountConfig();
        this.mountRoutes();
    }
    mountConfig() {
        // EJS config
        this.app.use(express_ejs_layouts_1.default);
        this.app.set('view engine', 'ejs');
        // Body parser config
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        // Express session config
        this.app.use(express_session_1.default({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));
    }
    mountRoutes() {
        this.router.routes(this.app);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map