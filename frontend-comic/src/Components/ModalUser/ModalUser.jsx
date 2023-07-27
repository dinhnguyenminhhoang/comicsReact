import classNames from "classnames/bind";
import styles from "./ModalUser.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateUser, getUserInfo } from "~/redux/action/action";
import FormModal from "./FormModal";
const cx = classNames.bind(styles);
function ModalUser(props) {
    const { userInfo, handleCloseFormParent } = props;
    const [formData, setFormData] = useState({
        ...userInfo,
    });
    const [imageData, setImageData] = useState(userInfo.image);
    const dispatch = useDispatch();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSetImage = (image) => {
        setImageData(image);
        setFormData({ ...formData, image: image });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            updateUser({
                id: formData.id,
                email: formData.email,
                username: formData.username,
                image: formData.image,
                roleId: formData.roleId || "R3",
            })
        ).then(() => {
            dispatch(getUserInfo(userInfo.email));
        });
        setFormData({
            email: "",
            image: "",
            username: "",
        });
        handleCloseFormParent(true);
    };
    const handleClose = () => {
        handleCloseFormParent(true);
    };
    return (
        <div className={cx("modal-container")}>
            <div className={cx("modal-user")}>
                <div className={cx("close")} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
                {userInfo && (
                    <FormModal
                        cx={cx}
                        formData={formData}
                        imageData={imageData}
                        handleInputChange={handleInputChange}
                        handleSetImage={handleSetImage}
                        handleSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
}

export default ModalUser;
