import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./component/Layout";
import Login, { action as loginAction } from "./component/Login";
import Register, { action as registerAction } from "./component/Register";
import DashboardLayout from "./component/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import LiveStream from "./pages/LiveStream";
import ErrorPage from "./pages/ErrorPage";
import { requireAuth } from "./requireAuth";
import Profile from "./pages/Profile";

// NOT DOING ANY REQUIRE AUTH FUNCTION UNTIL FIGUREOUT A WAY TO IMPLEMENT IT IN BEST PRACTICE WAY! ( I DONT WANT TO USER LOCALSTORAGE )
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route
          index
          element={<Login />}
          action={loginAction}
          // loader={async ({ request }) => requireAuth(request)}
        />
        <Route
          path="register"
          element={<Register />}
          action={registerAction}
          // loader={async ({ request }) => requireAuth(request)}
        />

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={<Dashboard />}
            loader={async ({ request }) => requireAuth(request)}
          />
          <Route
            path="livestream"
            element={<LiveStream />}
            loader={async ({ request }) => requireAuth(request)}
          />
          <Route
            path="profile"
            element={<Profile />}
            loader={async ({ request }) => requireAuth(request)}
          />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
