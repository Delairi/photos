import { useEffect, useRef, useState } from "react"
import Card from "../components/Card/Card"
import { images } from "../utils/images.mock"
import type { CardProps } from "../components/Card/Card.interface"
import { Resize } from "../utils/Resize"

const Home = () => {
  const container = useRef<HTMLDivElement | null>(null)
  const [rows, setRows] = useState<CardProps[][]>([])
  const [Images, setImages] = useState<CardProps[]>(images)
  useEffect(() => {
    const handleResize = () => Resize(container, Images, setRows)
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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