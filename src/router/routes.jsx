import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import Error from "../pages/error";
import Blogs from "../pages/blogs";
import Tutorials from "../pages/tutorials";
import Animations from "../pages/animations";
import MainLayout from "./../components/layout/main.layout";
import Animation from "../components/animation/animation.component";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/blogs", errorElement: <Error />, element: <Blogs /> },
      { path: "/tutorials", errorElement: <Error />, element: <Tutorials /> },
      {
        path: "animations",
        errorElement: <Error />,
        children: [
          { index: true, element: <Animations /> },
          { path: ":id", element: <Animation /> },
        ],
      },
    ],
  },
]);
