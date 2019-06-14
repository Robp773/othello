export default function chainFinder(boxes, turn, position) {
  console.log("checking chain");
  console.log(position);

  let checkList = [-9, -8, -7, 1, 9, 8, 7, -1];
  let clickedBox = boxes[position];

  if (clickedBox.pieceColor) {
    console.log("box occupied");
    return;
  }

  for (let i = 0; i < checkList.length; i++) {
    if (boxes[position + checkList[i]].border.length > 0) {
      console.log("adjacent piece has border");
    }
  }

  clickedBox.pieceColor = turn;

  return boxes;
}
