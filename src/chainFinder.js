export default async function chainFinder(boxes, turn, list) {
  let totals = list ? list : []

  // boxes.map((box, index) => {
  // })

  console.log(totals)

  return boxes;
}

function checkBox(boxes, position, turn, list) {
  let flipList = list ? list : []
  let directions = [-9, -8, -7, 1, 9, 8, 7, -1];
  // check all directions
  for (let i = 0; i < directions.length; i++) {
    // if direction is not off the board
    if (checkForEdges(boxes[position], directions[i])) {
      // if next box is empty - return no flips
      if (!boxes[position + directions[i]].pieceColor) {
        return false;
      }
      // if next box is the opposite color as the current turn - add index to flipList
      // and keep going in direction
      else if (boxes[position + directions[i]].pieceColor !== turn) {
        flipList.push(position + directions[i])
        return checkBox
      }
      else if (boxes[position + directions[i]].pieceColor === turn) {
        if (flipList.length > 0) {
          return flipList;
        }
        else {
          return false;
        }
      }
    }
    else {
      return false;
    }
  }
}

function checkForEdges(box, direction) {
  for (let i = 0; i < box.edges.length; i++) {
    if (box.edges[i] === direction) {
      return false;
    }
  }
  return true;
}