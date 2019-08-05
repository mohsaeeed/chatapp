export class CreateUserDto {
    readonly username: string;
    readonly name: Name;
    readonly email: string;
    readonly password: string;
}

export interface Name {
    readonly first: string;
    readonly last: string;
 }