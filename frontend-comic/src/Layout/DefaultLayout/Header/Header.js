import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { Container, Image } from "react-bootstrap";
import {
    faAddressBook,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./Header.module.scss";
import { fetchCategoryData, getUserInfo } from "~/redux/action/action";
import { logout } from "~/redux/slices/authSlices";
import Search from "~/Components/Search/Search";
import { logo } from "~/assets/images/index";
import ListTask from "./ListTask";
import MenuCategory from "./MenuCategory";
import ListAuth from "./ListAuth";
const cx = classNames.bind(Styles);
function Header() {
    let navigator = useNavigate();
    const categoryData = useSelector((state) => state.categoryApi.data);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userInfo = useSelector((state) => state.userInfo.data);
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoryData());
    }, [dispatch]);
    useEffect(() => {
        if (isLoggedIn) dispatch(getUserInfo(user.email));
    }, [dispatch, isLoggedIn]);

    const handleLogOut = (e) => {
        dispatch(logout());
        navigator("/");
    };

    return (
        <div className={cx("header-wrapper")}>
            <Container className={cx("container")}>
                <div className={cx("logo")}>
                    <Link to="/">
                        <Image
                            src={logo}
                            alt="logo"
                            width={40}
                            height={40}
                            style={{ borderRadius: "999px" }}
                        />
                    </Link>
                </div>
                <MenuCategory categoryData={categoryData} cx={cx} />
                <Search />
                {!isLoggedIn || !userInfo.user ? (
                    <ListAuth cx={cx} />
                ) : (
                    userInfo?.user && (
                        <ListTask
                            cx={cx}
                            image={userInfo.user.image}
                            id={userInfo.user.id}
                            firstIcon={faAddressBook}
                            secondIcon={faRightFromBracket}
                            handleLogOut={handleLogOut}
                        />
                    )
                )}
            </Container>
        </div>
    );
}

export default Header;
