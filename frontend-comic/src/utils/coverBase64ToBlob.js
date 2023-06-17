import convertBase64ToFile from "~/utils/convertBase64ToFile";
const coverBase64ToBlob = (base64Data) => {
  if (base64Data) {
    const base64Pattern = /^data:image\/(png|jpeg|jpg|gif);base64,/;
    if (base64Pattern.test(base64Data)) {
      const file = convertBase64ToFile(base64Data);
      return URL.createObjectURL(file);
    } else {
      return base64Data;
    }
  }
};
export default coverBase64ToBlob;
