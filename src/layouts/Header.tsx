import { Link } from "react-router"
import useStore from "../store"
import { signOut } from "aws-amplify/auth"

const Header = ({ hasBackground = true }: { hasBackground?: boolean }) => {

  const { user, setUser } = useStore()
  const Logout = () => {
    signOut().then( () => {
      setUser(null)
    })
  }
  return (
    <div className={`container-row-between p-4 ${hasBackground ? 'bg-[#f7f7f7]' : ''}`}>
      <h1 className="text-lg tracking-tighter">
        <Link to='/'>
          Delairi's photos
        </Link>
      </h1>
      <div className="flex flex-row gap-5">
        {
          user ?
            <button className="cursor-pointer" onClick={Logout}>Log out</button>
            :
            <>
              <Link to='/auth/signup' className="button">Signup</Link>
              <Link to='/auth/login' className="button">Login</Link>
            </>
        }

      </div>
    </div>
  )
}

export default Header