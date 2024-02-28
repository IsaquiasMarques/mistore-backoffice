export class UpdatePassData {
    Token: string;
    Email: string;
    NovaPalavraPasse: string

    /**
     * UserLogin
     */
    constructor(token: string, email: string, newPass: string) {
        this.Token = token;
        this.Email = email;
        this.NovaPalavraPasse = newPass;
    }
}