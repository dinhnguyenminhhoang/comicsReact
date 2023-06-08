import Following from "~/Pages/Following/Following.js";
import Home from "~/Pages/Home/Home.js";
import HeaderOnly from "~/Layout/HeaderOnly/HeaderOnly.js";
import DetailComic from "~/Pages/DetailComic/DetailComic.js";
import UserManager from "~/Pages/Admin/CRUD/UserManager/UserManager.js";
import ComicManage from "~/Pages/Admin/CRUD/ComicManage/ComicManage.js";
import CreateChapters from "~/Pages/Admin/CRUD/CreateChapters/CreateChapters.js";
import Categories from "~/Pages/Categories/Categories.js";
import CreateCategoryForComic from "~/Pages/Admin/CRUD/CreateCategoryForComic/CreateCategoryForComic.js";
import DetailChapter from "~/Pages/DetailChapter/DetailChapter.js";
import Login from "~/Pages/Auth/Login/Login.js";
import Register from "~/Pages/Auth/Register/Register.js";
import Profile from "~/Pages/Profile/Profile.js";
import Statistical from "~/Pages/Admin/Statistical/Statistical.js";
const publishRouter = [
  {
    path: "/",
    element: Home,
    Layout: HeaderOnly,
  },
  {
    path: "/pages/:pageNumber",
    element: Home,
    Layout: HeaderOnly,
  },
  {
    path: "/following",
    element: Following,
    Layout: HeaderOnly,
  },
  {
    path: "/detail-comic/:id",
    element: DetailComic,
    Layout: HeaderOnly,
  },
  {
    path: "/categories/:id",
    element: Categories,
    Layout: HeaderOnly,
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
    // Layout: HeaderOnly,
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
    path: "/admin/4/:route",
    element: CreateCategoryForComic,
  },
  {
    path: "/admin/5/:route",
    element: Statistical,
  },
];
export { publishRouter, privateRouter };
