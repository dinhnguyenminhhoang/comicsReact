import Following from "~/Pages/Following/Following.js";
import Home from "~/Pages/Home/Home.js";
import HeaderOnly from "~/Layout/HeaderOnly/HeaderOnly.js";
const publishRouter = [
    {
        path: '/', element: Home
    },
    {
        path: '/following', element: Following, Layout: HeaderOnly
    }
]
const privateRouter = [

]
export { publishRouter, privateRouter }