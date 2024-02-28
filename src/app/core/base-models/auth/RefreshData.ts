export class RefreshData {
    accessToken: string;
    refreshToken: string;

    /**
     * UserLogin
     */
    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}