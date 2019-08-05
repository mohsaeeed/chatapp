import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    name: {
        first: String,
        last: String,
    },
    password: String,
    email: String,
});
