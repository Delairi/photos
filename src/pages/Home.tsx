import { useEffect, useRef, useState } from "react"
import Card from "../components/Card/Card"
import type { CardProps } from "../components/Card/Card.interface"
import { Resize } from "../utils/Resize"
import useStore from "../store"
import { getImages, getUrlImage } from "../services/Auth/Files"
import { getImageDimensions } from "../utils/getImageDimensions"
import { encodeUrlPreserveSlash } from "../utils/normalizeUrl"

const Home = () => {
  const { images, setImages, user } = useStore()
  const container = useRef<HTMLDivElement | null>(null)
  const [rows, setRows] = useState<CardProps[][]>([])
  useEffect(() => {
    if (!images) return
    const handleResize = () => Resize(container, images, setRows)
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  useEffect(() => {
    if (!user || images !== null) return
    console.log('call')
    getImages(`${user?.userId}`).then(async (r) => {
      console.log(r)
      const transform: CardProps[] = await Promise.all(
        r.items.map(async (image) => {
          const { url: { href, pathname } } = await getUrlImage(image.path)
          const date = r.items.find((item) => "/" + encodeUrlPreserveSlash(item.path) === pathname)?.lastModified as Date
          const dim = await getImageDimensions(href)
          return { url: href, width: dim.width, height: dim.height, date }
        })
      ) 
      console.log(transform)
      setImages(transform.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    })
  }, [user])


return (
  <div ref={container} className="flex flex-col gap-2 w-full">
    {rows.map((row, index) => (
      <div key={index} className="flex flex-row flex-nowrap w-full">
        {row.map((image) => (
          <Card key={image.id} image={image} />
        ))}
      </div>
    ))}
  </div>
)
}

export default Home