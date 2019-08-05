import { User } from './../../core/models/user';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schems';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema, collection: 'User' }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
