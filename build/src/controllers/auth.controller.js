"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
class AuthController {
    constructor() {
        this.getUsers = (req, res) => {
            user_1.User.findAll({})
                .then((users) => res.json(users))
                .catch((err) => res.status(500).json(err));
        };
        this.loginForm = (req, res) => {
            if (req.session.username) {
                return res.redirect('/home');
            }
            return res.render('login');
        };
        this.loginSubmit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            let errors = [];
            if (!username || !password) {
                errors.push({ msg: `Please enter username and password` });
            }
            if (errors.length > 0) {
                return res.render('login', { errors, username, password });
            }
            const user = yield user_1.User.findOne({ where: { username: username } });
            if (user && (yield user.validPassword(password))) {
                req.session.username = user.username;
                req.session.name = user.name;
                return res.redirect('/home');
            }
            errors.push({ msg: `Invalid username or password` });
            return res.render('login', { errors, username, password });
        });
    }
    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map