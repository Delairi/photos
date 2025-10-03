import { uploadData } from "aws-amplify/storage"

export async function uploadImage(path: string, file: File) {
    return uploadData({
        path: `uploads/${path}`,
        data: file,
        options: {
            contentType: file.type
        }
    })
}