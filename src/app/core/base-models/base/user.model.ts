export interface UserInterface{
    Id: string,
    Name: string;
    Email: string;
    Profile: string;
    Token: string;
    RefreshToken?: string;
    IsFirstAcess: boolean;
}