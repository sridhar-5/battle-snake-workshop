function info() {
  console.log("INFO");
  const response = {
    apiversion: "1",
    author: "",
    color: "#888888",
    head: "default",
    tail: "default",
  };
  return response;
}

function start(gameState) {
  console.log(`${gameState.game.id} START`);
}

function end(gameState) {
  console.log(`${gameState.game.id} END\n`);
}

function move(gameState) {
  const possibleMoves = ["up", "down", "left", "right"];

  var SafeMoves = GetSafeMoves(gameState, possibleMoves);
  console.log(SafeMoves);

  //if the no of safe moves are greater than 1
  if (SafeMoves) {
    var moveChoosen = SafeMoves[Math.floor(Math.random() * SafeMoves.length())];
  } else {
    // if there are no other safe moves
    moveChoosen =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length())];
  }

  //preparing the response
  var response = {
    move: moveChoosen,
  };

  //log the choosen move to make debuggin easier if you have to
  console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`);

  return response;
}

function GetSafeMoves(gameState, possibleMoves) {
  var SafeMoves = [];
  //this is the snake body
  const OurSnakeBody = gameState["you"]["body"];
  //checker head details
  const SnakeHead = gameState["you"]["head"];

  const getBoardDetails = gameState["board"];
  //wall of the snake is at x != 11 or y != 11
  // x !< 0 y !< 0

  // its a fact that head is what is leading the snake to any direction so head.x < 11 and head.y < 11 shoul;d d0
  possibleMoves.forEach((move) => {
    var GetCoordinates = getNextCoordinatesOfTheMove(SnakeHead, move);
    var SnakeTail = OurSnakeBody[OurSnakeBody.length - 1];
    var SnakeBodyExceptTail = OurSnakeBody.slice(0, OurSnakeBody.length - 2);
    //analyze the board and other snakes
    if (
      avoidHittingTheWalls(
        GetCoordinates,
        getBoardDetails["height"],
        getBoardDetails["width"]
      )
    ) {
      SafeMoves.push(move);
    } else if (
      OurSnakeBody.length > 1 &&
      JSON.stringify(GetCoordinates) == JSON.stringify(SnakeTail) &&
      CheckSnakeHeadNotInBody(GetCoordinates, SnakeBodyExceptTail)
    ) {
      SafeMoves.push(move);
    }
  });
  return SafeMoves;
}

function avoidHittingTheWalls(HeadCoordinates, height, width) {
  var result = true;
  if (
    HeadCoordinates.x < 0 ||
    HeadCoordinates.y < 0 ||
    HeadCoordinates.x >= width ||
    HeadCoordinates.y >= height
  ) {
    result = false;
  } else {
    result = true;
  }

  return result;
}

function getNextCoordinatesOfTheMove(SnakeHead, move) {
  var futureHeadOfSnake = Object.assign({}, SnakeHead);
  if (move == "up") {
    futureHeadOfSnake.y = SnakeHead.y + 1;
  }
  if (move == "down") {
    futureHeadOfSnake.y = SnakeHead.y - 1;
  }
  if (move == "left") {
    futureHeadOfSnake.x = SnakeHead.x - 1;
  }
  if (move == "right") {
    futureHeadOfSnake.x = SnakeHead.x + 1;
  }
  return futureHeadOfSnake;
}

module.exports = {
  info: info,
  start: start,
  move: move,
  end: end,
};
