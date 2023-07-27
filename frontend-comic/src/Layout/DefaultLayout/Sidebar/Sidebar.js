import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "~/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import TaskListAdmin from "./TaskListAdmin";
import TaskUser from "./TaskUser";
const cx = classNames.bind(styles);
function Sidebar() {
    let dispatch = useDispatch();
    let userInfo = useSelector((state) => state.userInfo.data);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (isLoggedIn && user) dispatch(getUserInfo(user.email));
    }, [dispatch]);
    const [activeItem, setActiveItem] = useState("profile");
    const url = [
        "profile",
        "admin-manager",
        "users-manager",
        "comics-manager",
        "chapters-manager",
    ];
    const { route } = useParams();

    const handleClick = (item) => {
        setActiveItem(item);
    };
    useEffect(() => {
        if (route) handleClick(route);
    }, [route]);
    return (
        <div className={cx("sidebar-wrapper")}>
            {isLoggedIn && userInfo?.user && (
                <div>
                    <TaskUser
                        cx={cx}
                        url={url}
                        activeItem={activeItem}
                        handleClick={handleClick}
                        userInfo={userInfo}
                    />
                    {isLoggedIn &&
                        userInfo?.user &&
                        (userInfo.user.roleId === "R3" ||
                            userInfo.user.roleId === "R2") && (
                            <div className={cx("nav")}>
                                {isLoggedIn &&
                                    userInfo?.user?.roleId === "R3" && (
                                        <div>
                                            <TaskListAdmin
                                                cx={cx}
                                                icon={faBolt}
                                                url={url}
                                                activeItem={activeItem}
                                                handleClick={handleClick}
                                            />
                                        </div>
                                    )}
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}

export default Sidebar;
