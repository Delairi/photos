import { useEffect, useState, type FormEvent } from "react"
import CreateAlbum from "../components/Form/CreateAlbum"
import Popup from "../components/Popup/Popup"
import { CreateAlbumService, GetAlbumsService } from "../services/Album.service"
import useStore from "../store"
import { FolderImage } from "../components/Images"
import { useNavigate } from "react-router"
import type { AlbumProps } from "../interfaces/Album"

const Albums = () => {

  const navigate = useNavigate()
  const { setIsPopupCreateAlbum, isPopupCreateAlbum } = useStore()
  const [albums, setAlbums] = useState<AlbumProps[] | null>(null)
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

  useEffect(() => {
    GetAlbumsService().then((response) => {
      if(!response) return
      setAlbums(response)
    })
  }, [])

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5" >

        {
          albums && albums.map((album) => {
            return <div className="flex flex-col items-center cursor-pointer" onClick={() => toAlbum(album.id)}>
              <FolderImage fill="black" width="40" height="40" key={album.id} />
              <span>{album.name}</span>
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