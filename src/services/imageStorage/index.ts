import { mainApi } from "../apis";

export const setImageBlob = async (file: File, path: string): Promise<any> => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await mainApi.post(
            "/files/upload?path=" + path,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return data
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}

export const deleteImage = async (url: string) => {
    if (url !== '') {
        try {
            await mainApi.delete('/files/delete?url=' + url);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }
}