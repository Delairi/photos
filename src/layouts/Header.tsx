import { Link } from "react-router"

const Header = () => {
  return (
      <div className="container-row-between p-4 bg-[#f7f7f7]">
        <h1 className="text-lg tracking-tighter">Delairi's photos</h1>
        <div className="flex flex-row gap-5">
        <Link to='/signup' className="button">Signup</Link>
        <Link to='/login' className="button">Login</Link>
        </div>
      </div>
  )
}

export default Header