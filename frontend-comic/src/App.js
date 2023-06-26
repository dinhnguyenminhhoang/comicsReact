import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publishRouter, privateRouter } from "~/routers";
import DefaultLayout from "~/Layout/DefaultLayout/DefaultLayout.js";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/slices/authSlices";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));
  const userInfo = useSelector((state) => state.userInfo.data);

  useEffect(() => {
    if (isLoggedIn && user) {
      dispatch(login(user));
    } else {
      dispatch(logout());
    }
  }, [dispatch, isLoggedIn, user]);

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
          {userInfo?.user?.roleId === "R3" &&
            privateRouter.map((route, index) => {
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
