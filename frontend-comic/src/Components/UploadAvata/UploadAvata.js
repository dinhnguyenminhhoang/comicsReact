import { useDropzone } from "react-dropzone";
import classNames from "classnames/bind";
import styles from "../ModalUser/ModalUser.module.scss"
const cx = classNames.bind(styles)
function UploadAvata(props) {
    const { handleSetImage } = props;
    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            handleSetImage(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
    });
    return (<div className={cx("mb-3")} style={{ display: "flex" }}>
        <div
            {...getRootProps()}
            className={cx("upload__image")}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Cập nhật avata mới</p>
            ) : (
                <p>Cập nhật avata mới</p>
            )}
        </div>
    </div>);
}

export default UploadAvata;