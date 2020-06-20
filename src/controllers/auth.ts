import { Request, Response, NextFunction } from "express";
import jwt from "jwt-simple";

import config from '../config';
import User, { IUser } from "../models/user";

function createToken(user: IUser | undefined) {
    if(!user) throw new Error('User required');
    
    return jwt.encode(
        { sub: user.id, iat: new Date().getTime() },
        config.SECRET
    );
}

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(422)
                .send({ error: "Must provide Username & Password" });
        }

        const exsits = await User.findOne({ email }).exec();

        if (exsits) {
            return res
                .status(422)
                .send({ error: "Username is already exsits" });
        }

        const user = await new User({ email, password }).save();

        res.json({
            user: { email: user.email },
            token: createToken(user)
        });

    } catch (e) {
        next(e);
    }
};

export const signIn = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <IUser>req?.user;

        res.send({
            user: { email: user.email },
            token: createToken(user)
        });

    } catch (e) {
        next(e);
    }
};

export default {
    signIn,
    signUp
};
