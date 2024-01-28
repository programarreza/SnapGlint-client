import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AddBlog from "../Pages/AddBlog/AddBlog";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import Blog_update from "../Pages/Blog_update/Blog_update";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Favorite from "../Pages/Favorite/Favorite";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "add_blog",
        element: <AddBlog />,
      },
      {
        path: "blog_details/:id",
        element: <BlogDetails />,
      },
      {
        path: "blog_update/:id",
        element: <Blog_update />,
      },
      {
        path: "favorite",
        element: <Favorite/>
      }
    ],
  },
]);

export default Router;
