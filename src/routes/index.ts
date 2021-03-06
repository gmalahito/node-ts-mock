import {Request, Response} from 'express';
import {AuthController} from '../controllers/auth.controller';

export class Routes {
    private authController: AuthController = new AuthController();

    public routes(app: any): void {
        app.route('/')
            .get(this.authController.loginForm)
            .post(this.authController.loginSubmit);

        app.route('/users')
            .get(this.authController.getUsers);

        app.route('/logout').get(this.authController.logout)

        app.route('/home').get((req: Request, res: Response) => {
            const {username, name} = req.session;

            if (!username) {
                res.redirect('/');
            }

            res.render('home', {username, name});
        });
    }
}
