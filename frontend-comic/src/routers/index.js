import Following from "~/Pages/Following/Following.js";
import Home from "~/Pages/Home/Home.js";
import HeaderOnly from "~/Layout/HeaderOnly/HeaderOnly.js";
import CreateUser from "~/Pages/Admin/CRUD/CreateUser/CreateUser.js";
import CreateComic from "~/Pages/Admin/CRUD/CreateComic/CreateComic.js";
import CreateChapters from "~/Pages/Admin/CRUD/CreateChapters/CreateChapters.js";
const publishRouter = [
  {
    path: "/",
    element: Home,
    Layout: HeaderOnly,
  },
  {
    path: "/following",
    element: Following,
    Layout: HeaderOnly,
  },
];
const privateRouter = [
  {
    path: "/create-user",
    element: CreateUser,
  },
  {
    path: "/create-comic",
    element: CreateComic,
  },
  {
    path: "/create-chapters",
    element: CreateChapters,
  },
];
export { publishRouter, privateRouter };
