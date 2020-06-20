import { model, Schema, Document, Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt-nodejs';

export interface IUser extends Document {
    email: string,
    password: string,
    verify: (password: string) => Promise<boolean>
}

export interface IUserModel extends Model<IUser> {
    verify(this: IUser, password: string): Promise<boolean>
 }

async function hashed(password: string) : Promise<string> {
    return new Promise((res, rej) => genSalt(10, (err, salt) => {
        if(err) return rej(err);

        hash(password, salt, null, (err, hashed) => {
            if(err) return rej(err);
            
            return res(hashed);
        });
    }));
};

const User = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

User.pre<IUser>('save', async function() {
    this.password = await hashed(this.password);  
});

User.methods.verify = async function(this: IUser, password: string) : Promise<boolean> {
    return new Promise<boolean>((res, rej) => compare(password, this.password, (err, same) => {
       if(err) return rej(err);

        return res(same);
    }));
};

export default model<IUser, IUserModel>('User', User);
