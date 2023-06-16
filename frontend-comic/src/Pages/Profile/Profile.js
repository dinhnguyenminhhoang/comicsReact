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
    if (userInfo)
      setImageToFile(coverBase64ToBlob(userInfo.image));
  }, [userInfo])
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
          <div className={cx("profile__info")}>
            <span className={cx("profile__name")}>{userInfo.username}</span>
            <span className={cx("profile__email")}>{userInfo.email}</span>
            <button
              className={cx("profile__repear")}
              onClick={handleShowRepearProfile}
            >
              <FontAwesomeIcon icon={faRepeat} className={cx("btn-icon")} />
              sửa hồ sơ
            </button>
          </div>
        </div>
      )}
      <div className={cx("profile__categorical")}>
        {followedData && followedData.data && (
          <span className={cx("profile__follow")}>
            <span className={cx("number__folow")}>
              {followedData.data.length}
            </span>{" "}
            đang theo dõi
          </span>
        )}
      </div>
      <div className={cx("profile__content")}>
        <div className={cx("profile__header")}>
          <span className={cx("header__category")}>Bộ sưu tập</span>
        </div>
        <div className={cx("content__container")}>
          <div className={cx("profile__category-wrapper")}>
            {followedData &&
              followedData.errCode === 0 &&
              followedData.data.map((comic, index) => {
                return (
                  <div className={cx("follow-item")} key={index}>
                    <Books
                      image={comic.image}
                      name={comic.name}
                      timePassed={followedData.data}
                      index={index}
                      id={comic.id}
                      className
                    />
                  </div>
                );
              })}
          </div>
          <div className={cx("profile__love-wrapper")}></div>
        </div>
      </div>
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
