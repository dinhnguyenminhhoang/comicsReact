import Home from "~/Pages/Home/Home";
import HeaderOnly from "~/Layout/HeaderOnly/HeaderOnly";
import HeaderFooter from "~/Layout/HeaderFooter/HeaderFooter";
import DetailComic from "~/Pages/DetailComic/DetailComic";
import UserManager from "~/Pages/Admin/CRUD/UserManager/UserManager";
import ComicManage from "~/Pages/Admin/CRUD/ComicManage/ComicManage";
import CreateChapters from "~/Pages/Admin/CRUD/CreateChapters/CreateChapters";
import Categories from "~/Pages/Categories/Categories";
import DetailChapter from "~/Pages/DetailChapter/DetailChapter";
import Login from "~/Pages/Auth/Login/Login";
import Register from "~/Pages/Auth/Register/Register";
import Profile from "~/Pages/Profile/Profile";
import Statistical from "~/Pages/Admin/Statistical/Statistical";
import Tests from "~/Tests/Tests";
const publishRouter = [
    {
        path: "/",
        element: Home,
        Layout: HeaderFooter,
    },
    {
        path: "/pages/:pageNumber",
        element: Home,
        Layout: HeaderFooter,
    },
    {
        path: "/detail-comic/:id",
        element: DetailComic,
        Layout: HeaderFooter,
    },
    {
        path: "/categories/:id",
        element: Categories,
        Layout: HeaderFooter,
    },
    {
        path: "/reading/:name/:id/:chapterId",
        element: DetailChapter,
        Layout: HeaderOnly,
    },
    {
        path: "/auth/login",
        element: Login,
        Layout: null,
    },
    {
        path: "/auth/register",
        element: Register,
        Layout: null,
    },
    {
        path: "/profile/:userId",
        element: Profile,
    },
    {
        path: "/test",
        element: Tests,
        Layout: HeaderOnly,
    },
];
const privateRouter = [
    {
        path: "/admin/1/:route",
        element: UserManager,
    },
    {
        path: "/admin/2/:route",
        element: ComicManage,
    },

    {
        path: "/admin/3/:route",
        element: CreateChapters,
    },
    {
        path: "/admin/5/:route",
        element: Statistical,
    },
];
export { publishRouter, privateRouter };
