//area where I am going to put my code
console.log("hello world")
//adding all the DOM elements that I am going to target
const game_box = document.querySelector(".game")

//getting the height and width of the game area in pixels
const game_box_width = 9
const game_box_height = 9
//mine proba function the higher the less mines there are
const mine_proba = 6

//the size of each tile in pixels\
//declares in let as it can be changed futher on
let tile_pixel_size = 50

//calculate how many square I can make
function num_squares(height, width, px) {
  //should return an array with the first elmt being and amount of square on the height and the second being the amount of squares on the width based on the px amount listed
  result = [Math.floor(height / px), Math.floor(width / px)]
  return result
}

function generateGame(height, width) {
  // height and width should be in tiles and not in pixels
  //should make all the square and append them to the parent elmt

  //making the identifiying "signature of each square"
  //ici va etre les coordonner que on va devoir utiliser pour le bot
  let x = 0
  let y = 0

  //making a variable for how many bombs are currently on the board
  let bombsOnBoard = 0

  //making the loop that will make all of the columns
  for (let i = 1; i < width + 1; i++) {
    const column = document.createElement("div")
    column.classList.add("column")
    //looping through and making all the square in each column
    for (let j = 1; j < height + 1; j++) {
      //making each of the squares that will be appended to the column element
      const square = document.createElement("div")
      square.classList.add("tile")
      square.classList.add("hidden")
      //square.classList.add("hidden")
      square.textContent = ""

      //adding the x y value to the ID of the square
      square.id = i + "_" + j

      //adding the square to the column element
      column.appendChild(square)
    }
    //adding the column element to the actual container
    game_box.appendChild(column)
  }

  //Here needs to be an algorithme to distribute the bombs among the tiles
  const squares = document.querySelectorAll(".tile")
  //("mine maker : ", squares)
  squares.forEach((tile) => {
    //("mine maker: ", tile.id)
    random_num = Math.round(Math.random() * mine_proba)

    //adding the buttons to the tiles to make it clickable
    add_button(tile)
    if (random_num == 1) {
      tile.classList.add("mine")
      tile.textContent = "💣"
    }
    let x = tile.id[0]
    let y = tile.id[2]
  })
}

//making the function which will determine the number displayed on the tile if not mine
//takes in the x and y coords of the tile that is being checked
function count_mines(x, y) {
  console.log("starting the mine counting function")
  const tiles = document.querySelectorAll("tile")
  let tiles_count = []
  console.log("mine being counted", x, y)

  x = parseInt(x)
  y = parseInt(y)
  //tiles are aranged like
  // 3 5 6
  // 2 m 7
  // 1 4 8

  //dealing with if the tiles height and width requirements
  //all this code is basically to only get the elements which are rendered and not imaginary ones

  if (x > 1 && x < game_box_width && y > 1 && y < game_box_height) {
    //no limits
    // no limits whatsoever so just push all of the tiles
    const tile1_id = (x - 1).toString() + "_" + (y - 1).toString()
    const tile1 = document.getElementById(tile1_id)

    const tile2_id = (x - 1).toString() + "_" + y.toString()
    const tile2 = document.getElementById(tile2_id)

    const tile3_id = (x - 1).toString() + "_" + (y + 1).toString()
    const tile3 = document.getElementById(tile3_id)

    const tile4_id = x.toString() + "_" + (y - 1).toString()
    const tile4 = document.getElementById(tile4_id)

    const tile5_id = x.toString() + "_" + (y + 1).toString()
    const tile5 = document.getAnimations(tile5_id)

    const tile6_id = (x + 1).toString() + "_" + (y + 1).toString()
    const tile6 = document.getElementById(tile6_id)

    const tile7_id = (x + 1).toString() + "_" + y.toString()
    const tile7 = document.getElementById(tile7_id)

    const tile8_id = (x + 1).toString() + "_" + (y - 1).toString()
    const tile8 = document.getElementById(tile8_id)

    //the mother of all pushes lmao
    tiles_count.push(
      tile1_id,
      tile2_id,
      tile3_id,
      tile4_id,
      tile5_id,
      tile6_id,
      tile7_id,
      tile8_id
    )
  } else if (x == 1) {
    const tile7_id = (x + 1).toString() + "_" + y.toString()
    const tile7 = document.getElementById(tile7_id)

    tiles_count.push(tile7_id)

    if (y == 1) {
      // the tile is on the left and on the bottom
      const tile5_id = x.toString() + "_" + (y + 1).toString()
      const tile5 = document.getAnimations(tile5_id)

      const tile6_id = (x + 1).toString() + "_" + (y + 1).toString()
      const tile6 = document.getElementById(tile6_id)

      tiles_count.push(tile5_id, tile6_id)
    } else if (y == game_box_height) {
      // the tile is on the top and the left
      const tile8_id = (x + 1).toString() + "_" + (y - 1).toString()
      const tile8 = document.getElementById(tile8_id)

      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      tiles_count.push(tile8_id, tile4_id)
    } else {
      // on the left with no limits
      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      const tile5_id = x.toString() + "_" + (y + 1).toString()
      const tile5 = document.getAnimations(tile5_id)

      const tile6_id = (x + 1).toString() + "_" + (y + 1).toString()
      const tile6 = document.getElementById(tile6_id)

      const tile8_id = (x + 1).toString() + "_" + (y - 1).toString()
      const tile8 = document.getElementById(tile8_id)

      tiles_count.push(tile4_id, tile5_id, tile6_id, tile8_id)
    }
  } else if (x == game_box_width) {
    const tile2_id = (x - 1).toString() + "_" + y.toString()

    tiles_count.push(tile2_id)
    if (y == game_box_height) {
      //the tile is in the bottom right
      const tile2_id = (x - 1).toString() + "_" + y.toString()
      const tile2 = document.getElementById(tile2_id)

      const tile3_id = (x - 1).toString() + "_" + (y + 1).toString()
      const tile3 = document.getElementById(tile3_id)

      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      const tile5_id = x.toString() + "_" + (y + 1).toString()
      const tile5 = document.getAnimations(tile5_id)

      tiles_count.push(tile2_id, tile3_id, tile4_id, tile5_id)
    } else if (y == 1) {
      //tile is in the top right
      const tile1_id = (x - 1).toString() + "_" + (y - 1).toString()
      const tile1 = document.getElementById(tile1_id)

      const tile2_id = (x - 1).toString() + "_" + y.toString()
      const tile2 = document.getElementById(tile2_id)

      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      tiles_count.push(tile1_id, tile2_id, tile4_id)
    } else {
      //the tile is on the right but no limits
      const tile1_id = (x - 1).toString() + "_" + (y - 1).toString()
      const tile1 = document.getElementById(tile1_id)

      const tile3_id = (x - 1).toString() + "_" + (y + 1).toString()
      const tile3 = document.getElementById(tile3_id)

      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      const tile5_id = x.toString() + "_" + (y + 1).toString()
      const tile5 = document.getAnimations(tile5_id)

      tiles_count.push(tile1_id, tile3_id, tile4_id, tile5_id)
    }
  } else if (y == 1) {
    //tile is on the bottom
    const tile2_id = (x - 1).toString() + "_" + y.toString()
    const tile2 = document.getElementById(tile2_id)

    const tile3_id = (x - 1).toString() + "_" + (y + 1).toString()
    const tile3 = document.getElementById(tile3_id)

    const tile5_id = x.toString() + "_" + (y + 1).toString()
    const tile5 = document.getAnimations(tile5_id)

    const tile6_id = (x + 1).toString() + "_" + (y + 1).toString()
    const tile6 = document.getElementById(tile6_id)

    const tile7_id = (x + 1).toString() + "_" + y.toString()
    const tile7 = document.getElementById(tile7_id)

    tiles_count.push(tile2_id, tile3_id, tile5_id, tile6_id, tile7_id)
  } else {
    //tile is on the top, no limits
    const tile1_id = (x - 1).toString() + "_" + (y - 1).toString()
    const tile1 = document.getElementById(tile1_id)

    const tile2_id = (x - 1).toString() + "_" + y.toString()
    const tile2 = document.getElementById(tile2_id)

    const tile4_id = x.toString() + "_" + (y - 1).toString()
    const tile4 = document.getElementById(tile4_id)

    const tile7_id = (x + 1).toString() + "_" + y.toString()
    const tile7 = document.getElementById(tile7_id)

    const tile8_id = (x + 1).toString() + "_" + (y - 1).toString()
    const tile8 = document.getElementById(tile8_id)

    tiles_count.push(tile1_id, tile2_id, tile4_id, tile7_id, tile8_id)
  }

  console.log("tiles being tested", tiles_count)
  for (let k = 0; k < tiles_count.length; k++) {
    const tile = document.getElementById(tiles_count[k])
    console.log("reading text content of ", tiles_count[k])
    if (tile.classList.contains("mine")) {
    } else {
      if (tile.textContent == "") {
        console.log("this is the mine funciont")
        //if the counter for the current tile is actually at 0
        let num = 1
        tile.textContent = num
      } else {
        let num_str = tile.textContent
        console.log("string number ", num_str)
        let num_int = parseInt(num_str)
        console.log("trying to pass ", num_int)
        tile.textContent = num_int + 1
      }
    }
  }
}

generateGame(9, 9)

const squares = document.querySelectorAll(".tile")
//"mine maker : ", squares
squares.forEach((tile) => {
  if (tile.classList.contains("mine")) {
    count_mines(tile.id[0], tile.id[2])
  }
})

function show_mines() {
  const mines = document.querySelectorAll(".mine")
  for (let i = 0; i < mines.length; i++) {
    mines[i].classList.remove("hidden")
  }
}

function lose() {
  const body = document.querySelector("body")
  body.style["background-color"] = "red"
  show_mines()
  //alert the player that he has lost
}

function add_button(tile) {
  tile.addEventListener("click", () => {
    tile.classList.remove("hidden")
    if (tile.textContent == "💣") {
      lose()
    }
  })
}
