import { useSelector } from "react-redux";
import { selectMemoryDisplayType } from "../redux/reducers/visualizationSettings.red";
import { selectAddressWidth } from "../redux/reducers/pinsInfo.red";
import { useCellOrder } from ".";

// This hook encapsulates the calculation of cell position in table / matrix view
export const useMemoryCSSMeasures = () => {
  const displayType = useSelector(selectMemoryDisplayType);
  const addressLength = useSelector(selectAddressWidth);

  const [getCellOrder] = useCellOrder();

  // vertical offset is needed to leave some place for header
  const verticalOffset = 22;
  const cellWidth = 70;
  const cellMargin = 2;
  const cellHeight = displayType === "table" ? 20 : 40;

  const containerWidth =
    displayType === "table"
      ? cellWidth * 2 + cellMargin
      : (cellWidth + cellMargin) * Math.pow(2, Math.floor(addressLength / 2));
  const containerHeight =
    displayType === "table"
      ? verticalOffset + Math.pow(2, addressLength) * (cellHeight + cellMargin)
      : verticalOffset + Math.pow(2, Math.ceil(addressLength / 2)) * (cellHeight + cellMargin);

  const getCellPosition = (cellIndex) => {
    if (displayType === "table") {
      const cellY = verticalOffset + cellIndex * (cellHeight + cellMargin);
      return {
        cellX: cellWidth + cellMargin,
        cellY,
        textX: 2 * cellWidth,
        textY: cellY + (cellHeight + cellMargin) / 2,
      };
    }
    const { row, column } = getCellOrder(cellIndex);
    return {
      cellX: column * (cellWidth + cellMargin),
      cellY: row * (cellHeight + cellMargin),
      textX: column * (cellWidth + cellMargin) + cellWidth,
      textY: row * (cellHeight + cellMargin) + (cellHeight + cellMargin) / 2,
    };
  };

  return [getCellPosition, { cellWidth, cellHeight, cellMargin, verticalOffset, containerWidth, containerHeight }];
};
