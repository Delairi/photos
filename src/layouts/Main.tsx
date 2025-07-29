import { Outlet } from "react-router"
import Header from "./Header"

const Main = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default Main