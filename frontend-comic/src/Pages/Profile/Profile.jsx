import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { getComicFollowed } from "~/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Books from "~/Components/Books/Books";
import ModalUser from "~/Components/ModalUser/ModalUser";
import coverBase64ToBlob from "~/utils/coverBase64ToBlob";
import { chipi } from "~/assets/images";
import UserInfo from "./UserInfo";
import Content from "./Content";
const cx = classNames.bind(styles);
function Profile() {
    const [isModal, setIsModal] = useState(false);
    const [imageToFile, setImageToFile] = useState();
    let dispatch = useDispatch();
    let followedData = useSelector((state) => state.comicFollowed.data);
    const userInfo = useSelector((state) => state.userInfo.data.user);
    useEffect(() => {
        if (userInfo && userInfo.id) {
            dispatch(getComicFollowed(userInfo.id));
        }
    }, [dispatch, userInfo]);
    const handleCloseFormParent = (isClose) => {
        isClose ? setIsModal(false) : setIsModal(true);
    };
    let handleShowRepearProfile = () => {
        setIsModal(true);
    };
    useEffect(() => {
        if (userInfo) setImageToFile(coverBase64ToBlob(userInfo.image));
    }, [userInfo]);
    return (
        <div className={cx("profile__wrapper")}>
            {userInfo && (
                <div className={cx("profile__user")}>
                    <img
                        src={imageToFile}
                        alt=""
                        className={cx("profile__image")}
                        width={120}
                        height={120}
                    />
                    <UserInfo
                        cx={cx}
                        userInfo={userInfo}
                        handleShowRepearProfile={handleShowRepearProfile}
                    />
                </div>
            )}
            <div className={cx("profile__categorical")}>
                {followedData && followedData.data && (
                    <span className={cx("profile__follow")}>
                        <span className={cx("number__folow")}>
                            {followedData.data.length}
                        </span>
                        đang theo dõi
                    </span>
                )}
            </div>
            <Content cx={cx} followedData={followedData} chipi={chipi} />
            {isModal && (
                <ModalUser
                    userInfo={userInfo}
                    handleCloseFormParent={handleCloseFormParent}
                />
            )}
        </div>
    );
}

export default Profile;
