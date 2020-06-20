import passport from 'passport';
import { Response, Request, NextFunction } from 'express'; 
import { Strategy as Local } from 'passport-local';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../config';
import User from '../models/user';

const localLogin = new Local({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }, async (err, user) => {
        if(err) {
            return done(err);
        }

        if(!user) { 
            return done(null, false, { message: 'Invalid username or password' }) 
        }
        
        user.verify(password)
            .then(() => done(null, user))
            .catch(() => done(null, false, { message: 'Invalid username or password' }))
    });
});

const opts = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.SECRET
};

const login = new Strategy(opts, function(payload, done) {
    User.findById(payload.sub, function(err, user) {
        if(err) {
            return done(err, false);
        }
        
        done(null, user || false);
    });
});

passport.use(login);
passport.use(localLogin);

export const verify = (req: Request, res: Response, next: NextFunction) => { 
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
        if (err) { 
            return next(err); 
        }
        
        console.log('token', user);
        if (!user) { 
            // passport-jwt doesn't handle errors correctly
            if(info.message === 'No auth token' || info.message === 'Missing credentials') {
                info = { error: info.message };
            }
            return res.status(401).send(info); 
        }
        
        req.user = user;
        next();
    })(req, res, next);
};

export const signIn = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, function(err, user, info) {
        if (err) { return next(err); }
        
        console.log('local', user);
        if (!user) { 
            if(info.message === 'No auth token' || info.message === 'Missing credentials') {
                info = { error: info.message };
            }
            return res.status(422).send(info); 
        }
        
        req.user = user;
        next();
    })(req, res, next);
}
