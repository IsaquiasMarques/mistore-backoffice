import { BaseEntity } from "../base/base-entity";
import { UserInterface } from "../base/user.model";

export class User extends BaseEntity {
    Name: string;
    Email: string;
    Profile: string;
    Token: string;
    RefreshToken: string;
    IsFirstAcess: boolean;

    constructor(
        user: UserInterface
    ) {

        super(user.Id)

        this.Name = user.Name;
        this.Email = user.Email;
        this.Profile = user.Profile;
        this.Token = user.Token;
        this.RefreshToken = user.RefreshToken ?? '';
        this.IsFirstAcess = user.IsFirstAcess;

    }
}
