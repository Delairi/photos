import { get, post } from "aws-amplify/api"
import { fetchAuthSession } from 'aws-amplify/auth';
import type { AlbumProps } from "../interfaces/Album";

export async function GetAlbumsService(): Promise<AlbumProps[] | undefined> {
    try {

        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();

        const response = await get({
            apiName: 'PhotosAPI',
            path: '/folders',
            options: {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            },
        }).response;

        const data = await response.body.json() as unknown as AlbumProps;
        console.log('GET succeeded:', data);
        return data;
    } catch (error) {
        console.log('GET failed: ', error);
    }
}

export async function CreateAlbumService(name: string) {
    try {

        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();

        const create = post({
            apiName: 'PhotosAPI',
            path: '/folders',
            options: {
                body: {
                    name,
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            },

        });

        const { body } = await create.response;
        const response = await body.json();

        console.log('POST call succeeded');
        console.log(response);
    } catch (error) {
        console.log('POST call failed: ', error);
    }
}