import { type FormEvent } from "react"
import CreateAlbum from "../components/Form/CreateAlbum"
import Popup from "../components/Popup/Popup"
import { CreateAlbumService } from "../services/Album.service"

const Albums = () => {
  
  const createAlbumSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget)
    const album = form.get('album')
    if(!album || typeof album !== "string") return;
    CreateAlbumService(album)
  }

  return (
    <div>
      <Popup title="Create Album">
        <CreateAlbum onSubmit={createAlbumSubmit} />
      </Popup>
    </div>
  )
}

export default Albums