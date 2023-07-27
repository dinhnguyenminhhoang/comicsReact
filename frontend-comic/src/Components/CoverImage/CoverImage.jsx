import React, { useEffect, useState } from "react";
import coverBase64ToBlob from "~/utils/coverBase64ToBlob";
const CoverImage = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const { base64Data, handleIsImage } = props;
  useEffect(() => {
    let datablob = coverBase64ToBlob(base64Data);
    setSelectedFile(datablob);
  }, [base64Data]);
  const handleIsImageFromChil = () => {
    handleIsImage(true);
  };
  return (
    <div>
      {base64Data && (
        <div>
          <p style={{ color: "white", textAlign: "center" }}>ảnh đã đã đăng:</p>
          <div
            style={{ borderRadius: 999, cursor: "pointer" }}
            onClick={handleIsImageFromChil}
          >
            <img
              src={selectedFile}
              alt="UploadedImage"
              height={100}
              width={100}
              style={{ objectFit: "cover", borderRadius: 999 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverImage;
