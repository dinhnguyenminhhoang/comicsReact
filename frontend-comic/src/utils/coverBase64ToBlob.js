import convertBase64ToFile from "~/utils/convertBase64ToFile";
const coverBase64ToBlob = (base64Data) => {
  if (base64Data) {
    const file = convertBase64ToFile(base64Data);
    return URL.createObjectURL(file);
  }
};
export default coverBase64ToBlob;
