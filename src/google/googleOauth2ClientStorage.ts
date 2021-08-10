import { Auth } from 'googleapis';
import { googleConfig } from "../config/googleConfig";

const clientMap: any = {};

export const storage = {
    createAndPutForId: (id: string, refreshToken: string): Auth.OAuth2Client => {
        const client: Auth.OAuth2Client = new Auth.OAuth2Client(googleConfig.clientID, googleConfig.clientSecret);
        client.setCredentials({refresh_token: refreshToken});
        clientMap[id] = client;

        return client;
    },

    getForId: (id: string): Auth.OAuth2Client => {
        return clientMap[id];
    },
}
