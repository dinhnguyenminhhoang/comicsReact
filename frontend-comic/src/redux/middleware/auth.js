export const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === "auth/login") {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(action.payload));
  } else if (action.type === "auth/logout") {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  }

  next(action);
};

// Áp dụng middleware cho store
