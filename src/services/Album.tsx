import { post } from "aws-amplify/api"

export async function CreateAlbum(name: string) {
    try {
        const create = post({
            apiName: 'PhotosAPI',
            path: '/albums',
            options: {
                body: {
                    name
                }
            },
        });

        const { body } = await create.response;
        const response = await body.json();

        console.log('POST call succeeded');
        console.log(response);
    } catch (error) {
        console.log('POST call failed: ', JSON.parse(error.response.body));
    }
}