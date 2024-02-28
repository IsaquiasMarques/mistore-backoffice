export class UserLogin{
    nomeUsuario: string;
    palavraPasse: string;
    remoteIpAddress: string = '';

    constructor(user: string, palavraPasse: string) {
        this.nomeUsuario = user;
        this.palavraPasse = palavraPasse;
    }
}