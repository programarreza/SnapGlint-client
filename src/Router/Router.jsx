import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";


const Router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
		children: [
			{
				path: "/",
				element: <Home/>
			},
			{
				path: "register",
				element: <Register/>
			}
		]
	}
])

export default Router;