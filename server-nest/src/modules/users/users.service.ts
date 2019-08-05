import { User } from './../interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findOne(username: string): Promise<User> {

        return  this.userModel.findOne({username}).lean();

    }
}
