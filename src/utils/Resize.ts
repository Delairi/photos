import type { Dispatch, RefObject } from "react";
import type { CardProps } from "../components/Card/Card.interface";

export const Resize = (container: RefObject<HTMLDivElement | null>, Images: CardProps[], setRows:Dispatch<React.SetStateAction<CardProps[][]>>) => {
    
    if (!container.current) return;
    const totalWidth = container.current.offsetWidth;

    const rows: CardProps[][] = [];
    let row: CardProps[] = [];
    let rowWidth = 0;
    const maxWidth = totalWidth;

    Images.forEach((image: CardProps) => {
        if (rowWidth + image.width > maxWidth && row.length > 0) {
            rows.push(row);
            row = [];
            rowWidth = 0;
        }
        row.push({ ...image });
        rowWidth += image.width;
    });
    if (row.length > 0) rows.push(row);


    const resizeRows: CardProps[][] = rows.map((imageRow, idx) => {
        const lastRow = idx === rows.length - 1;
        if (lastRow && imageRow.length <= 2) {
            return imageRow.map(img => ({ ...img }));
        }
        const totalRow = imageRow.reduce((acc, img) => acc + img.width, 0);
        const scale = maxWidth / totalRow;
        let resizeRow = imageRow.map(img => ({
            ...img,
            width: Math.round(img.width * scale)
        }));

        let rowTotalSum = resizeRow.reduce((acc, img) => acc + img.width, 0);
        let excess = maxWidth - rowTotalSum;
        let i = 0;
        while (excess !== 0 && resizeRow.length > 0) {
            resizeRow[i % resizeRow.length].width += excess > 0 ? 1 : -1;
            excess += excess > 0 ? -1 : 1;
            i++;
        }
        return resizeRow;
    });

    setRows(resizeRows)
};