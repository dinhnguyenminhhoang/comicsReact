import Following from "~/Pages/Following/Following.js";
import Home from "~/Pages/Home/Home.js";
import HeaderOnly from "~/Layout/HeaderOnly/HeaderOnly.js";
import DetailComic from "~/Pages/DetailComic/DetailComic.js";
import CreateUser from "~/Pages/Admin/CRUD/CreateUser/CreateUser.js";
import CreateComic from "~/Pages/Admin/CRUD/CreateComic/CreateComic.js";
import CreateChapters from "~/Pages/Admin/CRUD/CreateChapters/CreateChapters.js";
import Categories from "~/Pages/Categories/Categories.js";
import CreateCategoryForComic from "~/Pages/Admin/CRUD/CreateCategoryForComic/CreateCategoryForComic.js";
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
];
const privateRouter = [
  {
    path: "/admin/1/:route",
    element: CreateUser,
  },
  {
    path: "/admin/2/:route",
    element: CreateComic,
  },

  {
    path: "/admin/3/:route",
    element: CreateChapters,
  },
  {
    path: "/admin/4/:route",
    element: CreateCategoryForComic,
  },
];
export { publishRouter, privateRouter };
