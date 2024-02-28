export class UpdatePassDataLogged {
    PalavraPasseNova: string;
    PalavraPasseActual: string;

    constructor(palavraPasseActual: string, palavraPasseNova: string) {
        this.PalavraPasseActual = palavraPasseActual;
        this.PalavraPasseNova = palavraPasseNova;
    }
}