import { Link } from "react-router"

const Header = ({ hasBackground = true }: { hasBackground?: boolean }) => {
  return (
    <div className={`container-row-between p-4 ${hasBackground ? 'bg-[#f7f7f7]' : ''}`}>
      <h1 className="text-lg tracking-tighter">
        <Link to='/'>
          Delairi's photos
        </Link>
      </h1>
      <div className="flex flex-row gap-5">
        <Link to='/auth/signup' className="button">Signup</Link>
        <Link to='/auth/login' className="button">Login</Link>
      </div>
    </div>
  )
}

export default Header