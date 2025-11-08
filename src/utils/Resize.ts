import type { Dispatch, RefObject } from "react";
import type { CardProps } from "../components/Card/Card.interface";

// 🔹 Límites de altura
const MIN_HEIGHT = 200;
const MAX_HEIGHT = 350;

export const Resize = (
  container: RefObject<HTMLDivElement | null>,
  Images: CardProps[],
  setRows: Dispatch<React.SetStateAction<CardProps[][]>>
) => {
  if (!container.current) return;

  const totalWidth = container.current.offsetWidth;
  const rows: CardProps[][] = [];
  let row: CardProps[] = [];
  let rowWidth = 0;

  // 🔹 Agrupar imágenes por filas según ancho disponible
  Images.forEach((image) => {
    const aspectRatio = image.width / image.height;
    const scaledWidth = aspectRatio * MIN_HEIGHT;

    if (rowWidth + scaledWidth > totalWidth && row.length > 0) {
      rows.push(row);
      row = [];
      rowWidth = 0;
    }

    row.push({
      ...image,
      width: scaledWidth,
      height: MIN_HEIGHT,
    });

    rowWidth += scaledWidth;
  });

  if (row.length > 0) rows.push(row);

  // 🔹 Ajustar filas al ancho del contenedor
  const resizeRows = rows.map((imageRow) => {
    const totalRowWidth = imageRow.reduce((sum, img) => sum + img.width, 0);
    let scale = totalWidth / totalRowWidth;

    // Aplicar el escalado sin exceder los límites de altura
    return imageRow.map((img) => {
      let newHeight = img.height * scale;

      if (newHeight < MIN_HEIGHT) {
        scale = MIN_HEIGHT / img.height;
        newHeight = MIN_HEIGHT;
      } else if (newHeight > MAX_HEIGHT) {
        scale = MAX_HEIGHT / img.height;
        newHeight = MAX_HEIGHT;
      }

      const newWidth = img.width * scale;

      return {
        ...img,
        width: Math.round(newWidth),
        height: Math.round(newHeight),
      };
    });
  });

  setRows(resizeRows);
};
