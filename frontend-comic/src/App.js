import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publishRouter, privateRouter } from "~/routers";
import DefaultLayout from "~/Layout/DefaultLayout/DefaultLayout.js";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/slices/authSlices";
function App() {
  const dispatch = useDispatch();

  // Kiểm tra localStorage để khôi phục trạng thái đăng nhập
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));

  if (isLoggedIn && user) {
    dispatch(login(user));
  } else {
    dispatch(logout());
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          {publishRouter.map((route, index) => {
            let Layout = DefaultLayout;
            const Page = route.element;
            if (route.Layout) {
              Layout = route.Layout;
            } else if (route.Layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {privateRouter.map((route, index) => {
            let Layout = DefaultLayout;
            const Page = route.element;
            if (route.Layout) {
              Layout = route.Layout;
            } else if (route.Layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
