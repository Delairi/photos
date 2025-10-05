import { uploadData, getUrl, list } from "aws-amplify/storage"

export async function getUrlImage(path:string){
   return getUrl({
    path
   }) 
}
export async function uploadImage(path: string, file: File) {
    return uploadData({
        path: `uploads/${path}`,
        data: file,
        options: {
            contentType: file.type
        }
    })
}

export async function getImages(path:string){
    return list({
        path: `uploads/${path}`
    })
}
