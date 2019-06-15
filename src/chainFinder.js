export default function chainFinder(boxes, turn, position) {

  let directions = [-9, -8, -7, 1, 9, 8, 7, -1];
  let clickedBox = boxes[position];

  if (clickedBox.pieceColor) {
    console.log('Piece already placed');
    return;
  }

  boxes[position].pieceColor = turn
  let newBoxes;
  let flipList = []
  for (let i = 0; i < directions.length; i++) {
    checkNextBox(boxes, position, directions[i], turn).map((box, index) => {
      flipList.push(box)
    })
  }
  return flipPieces(boxes, flipList, turn)
}

function flipPieces(boxes, flipList, turn) {
  console.log(flipList)
  flipList.map((box) => {
    boxes[box].pieceColor = turn
  })
  return boxes

}

function checkNextBox(boxes, position, direction, turn, flipList) {
  let curflipList = flipList ? flipList : [];
  // check to see if next position is off the board
  if (checkForEdges(boxes[position], direction)) {

    // if the next position is empty 
    if (!boxes[position + direction].pieceColor) {
      // console.log('blank space - returning empty array')
      return []
    }

    // if next piece is same color as current turn
    // and the curfliplist length is atleast 1
    // return the curfliplist
    else if (boxes[position + direction].pieceColor === turn) {

      if (curflipList.length > 0) {
        console.log('next position is the same as turns, returning flip list')
        return curflipList
      }
      else return []
    }

    // if next position is not the same color piece as the current turn
    else if (boxes[position + direction.pieceColor] !== turn) {
      curflipList.push(position + direction)
      return checkNextBox(boxes, position + direction, direction, turn, curflipList)
    }

    // if the next position is empty or the same color
    else {
      // and the flip list has at least one value
      if (curflipList.length > 0) {
        // flip all of the pieces and return the boxes array
        console.log('returning a flip list')
        return curflipList
      }
      // if flip list doesnt have any values - return the untouched boxes array
      else {
        console.log('no flips found, returning empty array')
        return []
      }
    }
  }
  // if the next position is off the board - returned the untouched boxes array
  else {
    console.log('edge detected, returning empty array')
    return [];
  }
}

function checkForEdges(box, nextPosition) {
  console.log(box.edges, nextPosition)
  for (let i = 0; i < box.edges.length; i++) {
    if (box.edges[i] === nextPosition) {
      console.log('ENDING SCAN - EDGE DETECTED')
      return false;
    }
  }
  return true;
}
