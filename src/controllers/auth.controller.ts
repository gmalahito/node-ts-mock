import { Response, Request, NextFunction} from 'express';
import { User } from '../models/user';

export class AuthController
{
    public getUsers = (req: Request, res: Response) => {
        User.findAll<User>({})
        .then((users: [User]) => res.json(users))
        .catch((err: Error) => res.status(500).json(err));
    }

    public loginForm = (req: Request, res: Response) => {
        if(req.session.username){
            return res.redirect('/home');
        }

        return res.render('login');
    }

    public loginSubmit = async (req: Request, res: Response, next: NextFunction) => {
        const { username, password} = req.body;
        const errors = [];

        if (!username || !password) {
            errors.push({msg: `Please enter username and password`});
        }

        if (errors.length > 0) {
            return res.render('login', {errors, username, password});
        }

        const user = await User.findOne({where: {username}});

        if (user && await user.validPassword(password)) {
            req.session.username = user.username;
            req.session.name = user.name;

            return res.redirect('/home');
        }

        errors.push({msg: `Invalid username or password`});
        return res.render('login', {errors, username, password});
    }

    public logout(req: Request, res: Response) {
        req.session.destroy( () => {
            res.redirect('/');
        });
    }
}
