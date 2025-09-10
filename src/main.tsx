import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home.tsx';
import Main from './layouts/Main.tsx';
import Albums from './pages/Albums.tsx';
import Locked from './pages/Locked.tsx';
import Trash from './pages/Trash.tsx';
import Favorites from './pages/Favorites.tsx';
import Login from './pages/Login.tsx';
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports.js";

Amplify.configure(awsExports);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        element: <Home />,
        path: "/"
      },
      {
        element: <Albums />,
        path: "/albums"
      },
      {
        element: <Favorites />,
        path: "/favorites"
      },
      {
        element: <Trash />,
        path: "/trash"
      },
      {
        element: <Locked />,
        path: "/locked"
      }
    ]
  },
  {
    element: <Login />,
    path: "/login"
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
