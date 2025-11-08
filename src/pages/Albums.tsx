import { type FormEvent } from "react"
import CreateAlbum from "../components/Form/CreateAlbum"
import Popup from "../components/Popup/Popup"
import { CreateAlbumService } from "../services/Album.service"
import useStore from "../store"
import { FolderImage } from "../components/Images"
import { useNavigate } from "react-router"

const Albums = () => {

  const navigate = useNavigate()
  const { setIsPopupCreateAlbum, isPopupCreateAlbum } = useStore()
  const createAlbumSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget)
    const album = form.get('album')
    if (!album || typeof album !== "string") return;
    CreateAlbumService(album)
  }

  const closePopupCreateAlbum = () => {
    setIsPopupCreateAlbum(false);
  }

  const toAlbum = (id: string | number) => {
    navigate(`/album/${id}`)
  }
  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5" >

        {
          [...new Array(10)].fill(0).map((_, index) => {
            return <div className="flex flex-col items-center cursor-pointer" onClick={() => toAlbum(index)}>
              <FolderImage fill="black" width="40" height="40" key={index} />
              <span>Folder name</span>
            </div>
          })
        }

      </div>
      {
        isPopupCreateAlbum && <Popup title="Create Album">
          <CreateAlbum close={closePopupCreateAlbum} onSubmit={createAlbumSubmit} />
        </Popup>
      }

    </div>
  )
}

export default Albums