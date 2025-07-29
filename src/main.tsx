import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home.tsx';
import Main from './layouts/Main.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        element: <Home />,
        path: "/"
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
