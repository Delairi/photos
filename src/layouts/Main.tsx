import { Outlet } from "react-router"
import Header from "./Header"
import Menu from "../components/Menu/Menu"
import setUser from "../hooks/setUser"

const Main = () => {
  setUser()
  return (
    <div className="h-screen">
      <Header />
      <div className="h-11/12">
        <div className="flex flex-row h-full">
          <div className="overflow-y-auto">
            <Menu />
          </div>
          <div className="flex-1 h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main