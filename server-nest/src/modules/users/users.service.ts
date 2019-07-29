import { User } from './../../core/models/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: '1',
                username: 'mohsaeeed',
                name: {
                    first: 'mohammed',
                    last: 'abdelrahman',
                },
                email: 'moh.saeeed@gmail.com',
                password: '12344321',
            },
            {
                userId: '2',
                username: 'huzsaeeed',
                name: {
                    first: 'huzyfa',
                    last: 'abdelrahman',
                },
                email: 'huz.saeeed@gmail.com',
                password: '12344321',
            },
            {
                userId: '3',
                username: 'harsaeeed',
                name: {
                    first: 'harith',
                    last: 'abdelrahman',
                },
                email: 'har.saeeed@gmail.com',
                password: '12344321',
            },
        ];
    }

    async findOne(username: string) {

        const user = this.users.find( u => u.username === username);

        return user;
    }
}
