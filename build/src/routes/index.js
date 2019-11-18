"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
class Routes {
    constructor() {
        this.authController = new auth_controller_1.AuthController();
    }
    routes(app) {
        app.route('/')
            .get(this.authController.loginForm)
            .post(this.authController.loginSubmit);
        app.route('/users')
            .get(this.authController.getUsers);
        app.route('/logout').get(this.authController.logout);
        app.route('/home').get((req, res) => {
            const { username, name } = req.session;
            if (!username) {
                res.redirect('/');
            }
            res.render('home', { username, name });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map