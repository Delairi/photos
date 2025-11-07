import type { CardProps } from "./Card.interface"

const Card = ({ image, onClick }: { image: CardProps, onClick: () => void }) => {
    return (
        <div className="shadow-md rounded-md" onClick={onClick}>
            <img src={image.url} width={image.width} className="h-full" />
        </div>
    )
}

export default Card