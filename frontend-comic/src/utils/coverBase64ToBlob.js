import convertBase64ToFile from "~/utils/convertBase64ToFile";

const coverBase64ToBlob = (base64Data) => {
    if (base64Data) {
        try {
            const file = convertBase64ToFile(base64Data);
            return URL.createObjectURL(file);
        } catch (error) {
            console.error("Error converting base64 to blob:", error);
            return base64Data;
        }
    }
};

export default coverBase64ToBlob;
