import { Response, Request, NextFunction} from 'express';

export class AuthController
{
    public loginForm = (req: Request, res: Response) => {
        if(req.session.username){
            return res.redirect('/home');
        }

        return res.render('login');
    }

    public loginSubmit = async (req: Request, res: Response, next: NextFunction) => {
        const { username, password} = req.body;
        let errors = [];

        if (!username || !password) {
            errors.push({msg: `Please enter username and password`});
        }

        if (errors.length > 0){
            return res.render('login',{errors, username, password});
        }

        if(username === 'juan' && password == 'secret'){
            req.session.username = username;
            return res.redirect('/home');
        }

        errors.push({msg: `Please enter username and password`});
        return res.render('login',{errors, username, password});
    }

    public logout(req: Request, res: Response) {
        req.session.destroy( () => {
            res.redirect('/');
        })
    }
}