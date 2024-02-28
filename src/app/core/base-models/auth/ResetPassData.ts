export class ResetPassData {
    email: string;
    clientURI: string;

    /**
     * UserLogin
     */
    constructor(email: string, clienteURL: string) {
        this.email = email;
        this.clientURI = clienteURL;
    }
}