import { Document } from 'mongoose';

export interface User extends Document {
   readonly username: string;
   readonly password: string;
   readonly name: Name;
   readonly email: string;
}

export interface Name {
   readonly first: string;
   readonly last: string;
}
