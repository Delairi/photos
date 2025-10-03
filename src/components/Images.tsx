interface SvgProps {
    fill?: string
    children?: React.ReactNode,
    width?: string
    height?: string
}

const SvgIcon = ({ fill = "white", width = "24px", height = "24px", children }: SvgProps) => (
    <svg width={width} height={height} fill={fill}>
        {children}
    </svg>
)

export const PhotosImage = ({ fill }: SvgProps) => {
    return (
        <SvgIcon fill={fill}>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"></path>
        </SvgIcon>
    )
}

export const AlbumImage = ({ fill }: SvgProps) => {
    return (
        <SvgIcon fill={fill}>
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h6v7l2.5-1.88L17 11V4h1v16zm-4.33-6L17 18H7l2.5-3.2 1.67 2.18 2.5-2.98z"></path>
        </SvgIcon>
    )
}

export const FavoriteImage = ({ fill }: SvgProps) => {
    return (
        <SvgIcon fill={fill}>
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
        </SvgIcon>
    )
}

export const TrashImage = ({ fill }: SvgProps) => {
    return (
        <SvgIcon fill={fill}>
            <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 8h2v9H9zm4 0h2v9h-2z"></path>
        </SvgIcon>
    )
}

export const LockedImage = ({ fill }: SvgProps) => {
    return (
        <SvgIcon fill={fill}>
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
        </SvgIcon>
    )
}

export const PlusImage = ({ fill }: SvgProps) => {
    return (
        <SvgIcon fill={fill}>
            <path stroke={fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
        </SvgIcon>
    )
}