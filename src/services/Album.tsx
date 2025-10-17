import { post } from "aws-amplify/api"
import { fetchAuthSession } from 'aws-amplify/auth';

export async function CreateAlbum(name: string) {
    try {

        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();

        const create = post({
            apiName: 'PhotosAPI',
            path: '/folders',
            options: {
                body: {
                    name
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