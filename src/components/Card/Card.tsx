import type { CardProps } from "./Card.interface"

const Card = ({ image }: { image: CardProps }) => {
    return (
        <div className="shadow-md rounded-md">
            <img src={image.url} width={image.width} className="h-full" />
        </div>
    )
}

export default Card