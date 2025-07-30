import { Link, useLocation } from "react-router"
import { AlbumImage, FavoriteImage, LockedImage, PhotosImage, TrashImage } from "../Images"

const Menu = () => {

  const location = useLocation()
  const isPhotos = location.pathname === '/' ? 'active' : '';
  const isAlbum = location.pathname.includes('albums') ? 'active' : '';
  const isFavorites = location.pathname.includes('favorites') ? 'active' : '';
  const isTrash = location.pathname.includes('trash') ? 'active' : '';
  const isLockedFolder = location.pathname.includes('locked') ? 'active' : '';

  return (
    <div className="shadow-md p-2 w-[250px] h-full">
      <ul className="flex flex-col gap-4">
        <li className={`li ${isPhotos} grid grid-cols-2 gap-1`}>
          <div className="container-row-end">
            <PhotosImage fill={isPhotos ? 'white' : '#3f3d3d'} />
          </div>
          <Link to='/' className="container-row-start">Photos</Link>
        </li>

        <li className={`li ${isAlbum} grid grid-cols-2  gap-1`}>
          <div className="container-row-end">
            <AlbumImage fill={isAlbum ? 'white' : '#3f3d3d'} />
          </div>
          <Link to='/albums' className="container-row-start">Albums</Link>
        </li>

        <li className={`li ${isFavorites} grid grid-cols-2  gap-1`}>
          <div className="container-row-end">
            <FavoriteImage fill={isFavorites ? 'white' : '#3f3d3d'} />
          </div>
          <Link to='/favorites' className="container-row-start">Favorites</Link>
        </li>

        <li className={`li ${isTrash} grid grid-cols-2  gap-1`}>
          <div className="container-row-end">
            <TrashImage fill={isTrash ? 'white' : '#3f3d3d'} />
          </div>
          <Link to='/trash' className="container-row-start">Trash</Link>
        </li>

        <li className={`li ${isLockedFolder} grid grid-cols-2  gap-1`}>
          <div className="container-row-end">
            <LockedImage fill={isLockedFolder ? 'white' : '#3f3d3d'} />
          </div>
          <Link to='/locked' className="container-row-start">Locked</Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu