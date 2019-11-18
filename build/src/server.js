"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = parseInt(process.env.NODE_PORT) || 3000;
const hostname = process.env.NODE_HOST || '127.0.0.1';
app_1.default.listen(port, hostname, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map