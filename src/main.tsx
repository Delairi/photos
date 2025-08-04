import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home.tsx';
import Main from './layouts/Main.tsx';
import Albums from './pages/Albums.tsx';
import Locked from './pages/Locked.tsx';
import Trash from './pages/Trash.tsx';
import Favorites from './pages/Favorites.tsx';

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
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
