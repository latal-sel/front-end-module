import { api } from "./http";

export const uploadCIDfile = async (file: Blob) => {
    const fileText = await file.text();
    return api.post("/file", {
        content: fileText
    });
}