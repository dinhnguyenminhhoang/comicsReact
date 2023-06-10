const convertBase64ToFile = (base64Data) => {
  if (base64Data) {
    const base64Response = base64Data.split(";base64,").pop();
    const contentType = base64Data.split(";")[0].split(":")[1];

    const byteCharacters = atob(base64Response);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const file = new File(byteArrays, "image", { type: contentType });
    return file;
  }
};
export default convertBase64ToFile;
