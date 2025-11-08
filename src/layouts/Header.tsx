import { Link, useLocation } from "react-router"
import useStore from "../store"
import { signOut } from "aws-amplify/auth"
import { PlusImage } from "../components/Images"
import { useId, type ChangeEvent } from "react"
import { getUrlImage, uploadImage } from "../services/Auth/Files"
import { getImageDimensions } from "../utils/getImageDimensions"

const Header = ({ hasBackground = true }: { hasBackground?: boolean }) => {

  const location = useLocation()
  const { user, setUser, images, setImages, setIsPopupCreateAlbum } = useStore()
  const inputFile = useId()
  const Logout = () => {
    signOut().then(() => {
      setUser(null)
    })
  }

  const openBrowserFile = () => {
    document.getElementById(inputFile)?.click()
  }

  const addImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const filename = files[0].name
    if (!user) return

    const response = await uploadImage(`${user.userId}/${filename}`, files[0])

    console.log(response.state)
    const uploaded = await response.result
    console.log(response.state)
    console.log(uploaded)
    if (response.state === 'SUCCESS') {
      const { url: { href } } = await getUrlImage(uploaded.path)
      const date = new Date()
      const dim = await getImageDimensions(href)
      const imageObject = { url: href, width: dim.width, height: dim.height, date: date.toString() }
      setImages([...images, imageObject])
    }

  }

  const createAlbum = () => {
    setIsPopupCreateAlbum(true)
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
            <>
              {
                location.pathname === "/albums" && <button onClick={createAlbum}>Create album</button>
              }

              {
                location.pathname === "/" && <button className="cursor-pointer" onClick={openBrowserFile}>
                  <PlusImage fill="#000" />
                </button>
              }
              <button className="cursor-pointer" onClick={Logout}>Log out</button>
              <input onChange={addImage} id={inputFile} type="file" className="hidden" />
            </>
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