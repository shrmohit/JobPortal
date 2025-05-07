import Login from "../src/components/auth/Login";
import Signup from "../src/components/auth/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Signup",
      element: <Signup />,
    },
    {
      path: "/Jobs",
      element: <Jobs />,
    },
    {
      path: "/Browse",
      element: <Browse />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/description/:id",
      element: <JobDescription />,
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
