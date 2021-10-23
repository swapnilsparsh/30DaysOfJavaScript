var modal = document.getElementById('myModal');


var grid = new Array(3);
grid[0] = new Array(3);
grid[1] = new Array(3);
grid[2] = new Array(3);
var player = 1;
var gameWon = 0;

// Stackoverflow 😛:
$("#square_one").click(function() {
  console.log("clicked");
  if (checkLegalMove(0, 0) == true) {
    if (player == 1) {
      $("#square_one_text").html("X");
      grid[0][0] = 'X';
      if (checkWin(1) == true) {
        endgame(1);
      }
      player = 2;
    } else {
      $("#square_one_text").html("O");
      grid[0][0] = 'O';
      if (checkWin(2) == true) {
        endgame(2);
      }
      player = 1;
    }
  }
});

$("#square_two").click(function() {
  if (checkLegalMove(0, 1) == true) {
    if (player == 1) {
      $("#square_two_text").html("X");
      grid[0][1] = 'X';
      if (checkWin(1) == true) {
        endgame(1);
      }
      player = 2;
    } else {
      $("#square_two_text").html("O");
      grid[0][1] = 'O';
      if (checkWin(2) == true) {
        endgame(2);
      }
      player = 1;
    }
  }
});

$("#square_three").click(function() {
  if (checkLegalMove(0, 2) == true) {
    if (player == 1) {
      $("#square_three_text").html("X");
      grid[0][2] = 'X';
      if (checkWin(1) == true) {
        endgame(1);
      }
      player = 2;
    } else {
      $("#square_three_text").html("O");
      grid[0][2] = 'O';
      if (checkWin(2) == true) {
        endgame(2);
      }
      player = 1;
    }
  }
});

$("#square_four").click(function() {
  if (checkLegalMove(1, 0) == true) {
    if (player == 1) {
      $("#square_four_text").html("X");
      grid[1][0] = 'X';
      if (checkWin(1) == true) {
        endgame(1);
      }
      player = 2;
    } else {
      $("#square_four_text").html("O");
      grid[1][0] = 'O';
      if (checkWin(2) == true) {
        endgame(2);
      }
      player = 1;
    }
  }
});

$("#square_five").click(function() {
  if (checkLegalMove(1, 1) == true) {
    if (player == 1) {
      $("#square_five_text").html("X");
      grid[1][1] = 'X';
      if (checkWin(1) == true) {
        endgame(1);
      }
      player = 2;
    } else {
      $("#square_five_text").html("O");
      grid[1][1] = 'O';
      if (checkWin(2) == true) {
        endgame(2);
      }
      player = 1;
    }
  }
});

$("#square_six").click(function() {
  if (checkLegalMove(1, 2) == true) {
    if (player == 1) {
      $("#square_six_text").html("X");
      grid[1][2] = 'X';
      if (checkWin(1) == true) {
        endgame(1);
      }
      player = 2;
    } else {
      $("#square_six_text").html("O");
      grid[1][2] = 'O';
      if (checkWin(2) == true) {
        endgame(2);
      }
      player = 1;
    }
  }
});

$("#square_seven").click(function() {
  if (checkLegalMove(2, 0) == true) {
    if (player == 1) {
      $("#square_seven_text").html("X");
   
            grid[2][0] = 'X';
      if (checkWin(1) == true) {
        endgame(1);
      }
   player = 2;
    } else {
      $("#square_seven_text").html("O");
      grid[2][0] = 'O';
      if (checkWin(2) == true) {
        endgame(2);
      }
      player = 1;
    }
  }
});

$("#square_eight").click(function() {
  if (checkLegalMove(2, 1) == true) {
    if (player == 1) {
      $("#square_eight_text").html("X");
      grid[2][1] = 'X';
      if (checkWin(1) == true) {
        endgame(1);
      }
      player = 2;
    } else {
      $("#square_eight_text").html("O");
      grid[2][1] = 'O';
      if (checkWin(2) == true) {
        endgame(2);
      }
      player = 1;
    }
  }
});

$("#square_nine").click(function() {
  if (checkLegalMove(2, 2) == true) {
    if (player == 1) {
      $("#square_nine_text").html("X");
      grid[2][2] = 'X';
      if (checkWin(1) == true) {
        endgame(1);
      }
      player = 2;
    } else {
      $("#square_nine_text").html("O");
      grid[2][2] = 'O';
      if (checkWin(2) == true) {
        endgame(2);
      }
      player = 1;
    }
  }
});

function checkWin(playerNum) {
  //check horizontal
  for (i = 0; i < 3; i++) {

    if ((grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2]) &&  grid[i][0] != undefined && grid[i][1] != undefined && grid[i][2] != undefined) {
     console.log("horizontal won");
      return true;
    }
  }

  //check vertical
  for (i = 0; i < 3; i++) {
    console.log("i is: " + i);
    console.log("grid[" + i + "][0] is " + grid[i][0]);
    console.log("grid[" + i + "][1] is " + grid[i][1]);
    console.log("grid[" + i + "][2] is " + grid[i][2]);
    if ((grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i]) && grid[0][i] != undefined && grid[1][i] != undefined && grid[2][i] != undefined) {
      console.log("vertical won");
      return true;
    }
  }

  //check diagonal
  if (((grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) || (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0])) && grid[1][1] !== undefined) {
     console.log("diagonal won");
    return true;
  }

  var tieGame = true;
  for (var i = 0; i < 3; i++) {
    for (var x = 0; x < 3; x++) {
      if (grid[i][x] == null && grid[i][x] == undefined) {
        tieGame = false;
      } 
    }
  }

  if (tieGame == true) {
    endgame(0);
  }

  return false;
}

function checkLegalMove(row, column) {
  console.log(grid[row][column]);
  if (grid[row][column] !== undefined && grid[row][column] !== null) {
    return false;
  } else {
    return true;
  }
}

function endgame(num) {
  if (num == 0) {
    $(".modal_text").html("Tie game!");
    $("#myModal").css("display", "block");
  }
  if (num == 1) {
    $(".modal_text").html("Player 1 Wins!");
    $("#myModal").css("display", "block");
  }
  if (num == 2) {
    $(".modal_text").html("Player 2 Wins!");
    $("#myModal").css("display", "block");
  }
}

$("#restartBtn").click(function(){
    grid = new Array(3);
    grid[0] = new Array(3);
    grid[1] = new Array(3);
    grid[2] = new Array(3);
    player = 1;
    gameWon = 0;
    $("#square_one_text").html("");
    $("#square_two_text").html("");
    $("#square_three_text").html("");
    $("#square_four_text").html("");
    $("#square_five_text").html("");
    $("#square_six_text").html("");
    $("#square_seven_text").html("");
    $("#square_eight_text").html("");
    $("#square_nine_text").html("");
    modal.style.display = "none";
});