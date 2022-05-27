angular.module('myApp', []).controller('GameController', ['$scope', function($scope) {
	
	//Draw the board game
    $scope.size = 8;
    $scope.widths = [];

    //Draw board
    for(var i = 0; i < $scope.size; i++) { 
        $scope.widths.push(i);
    }
	
}]);

$(document).ready(function() {   
    var themes = [
        {
            name: 'CLASSIC',
            boardBorderColor: '#666',
            lightBoxColor: '#fff',
            darkBoxColor: '#ccc',
            optionColor: '#000',
            optionHoverColor: '#999'
        },
        {   
            name: 'WOOD',
            boardBorderColor: '#803E04',
            lightBoxColor: '#FFCE9E',
            darkBoxColor: '#D18B47',
            optionColor: '#803E04',
            optionHoverColor: '#311B0B'
        },

    ];
    
    var colors = [
        {
            name: 'BLACK',
            color: '#000'
        }, 
        {
            name: 'GREEN',
            color: '#030'
        }, 
        {
            name: 'BLUE',
            color: '#036'
        }, 
        {
            name: 'PINK',
            color: '#606'
        }, 
        {
            name: 'BROWN',
            color: '#630'
        }
    ];
    
    var colorOption = 0;
    var themeOption = 1;
    
    //Change theme
    $('#theme-option').on('click', function() {
        themeOption === themes.length - 1 ? themeOption = 0 : themeOption++;
        
        setTheme();
    });
    
    //Set up theme
    var setTheme = function() {
        var theme = themes[themeOption];
        
        $('#theme-option').html(theme.name);
        
        $('#board').css('border-color', theme.boardBorderColor);
        $('.light-box').css('background', theme.lightBoxColor);
        $('.dark-box').css('background', theme.darkBoxColor);
        
        $('.option-nav').css('color', theme.optionColor);
        
        //Option button effect
        $('#option').css('color', theme.optionColor);
        $('#option').hover(
            function() {
                $(this).css('color', theme.optionHoverColor);
            }, function() {
                $(this).css('color', theme.optionColor);
            }
        );
        
        //Undo button effect
        $('#undo-btn').css('color', theme.optionColor);
        $('#undo-btn').hover(
            function() {
                $(this).css('color', theme.optionHoverColor);
            }, function() {
                $(this).css('color', theme.optionColor);
            }
        );
        
        //Option Menu effect
        $('#option-menu').css('color', theme.optionColor);
        $('.button').css('color', theme.optionColor);
        $('.button').hover(
            function() {
                $(this).css('color', theme.optionHoverColor);
            }, function() {
                $(this).css('color', theme.optionColor);
            }
        );
    }
    
    //Change color
    $('#color-option').on('click', function() {
       colorOption === colors.length - 1 ? colorOption = 0 : colorOption++;
        
        setColor();
    });
    
    //Set up color for chess pieces
    var setColor = function() {
        var color = colors[colorOption];
        
        $('#color-option').html(color.name);
        
        $('.box').css('color', color['color']);
        
        $('#pawn-promotion-option').css('color', color['color']);
        
        $('#player').css('color', color['color']);
    }
	 
	 //=====GLOBAL VARIABLES=========//

	//Chess pieces
	var chessPieces = {
		 'white': {
			  'king': '&#9812;',
			  'queen': '&#9813;',
			  'rook': '&#9814;',
			  'bishop': '&#9815;',
			  'knight': '&#9816;',
			  'pawn': '&#9817;'
		 },
		 'black': {
			  'king': '&#9818;',
			  'queen': '&#9819;',
			  'rook': '&#9820;',
			  'bishop': '&#9821;',
			  'knight': '&#9822;',
			  'pawn': '&#9823;'
		 }
	};

	var player = 'black'; //First player

	//Selected chess piece to move
	var select = {
		 canMove: false, //Ready to move of not
		 piece: '',      //Color, type of the piece
		 box: ''         //Position of the piece
	}

	//Game's history (pieces + positions)
	var historyMoves = [];

	//Position and color of pawn promotion
	var promotion = {};

	//Set up board game
	$(function() {		 
		$('#player').html(chessPieces.black.king);

		 //Set up color for boxes, chess pieces
		 for(var i = 0; i < 8; i++) {
			  for(var j = 0; j < 8; j++) {
					var box = $('#box-' + i + '-' + j);
					if((i + j) % 2 !== 0) {
						 box.addClass('light-box');
					} else {
						 box.addClass('dark-box');
					}
					setNewBoard(box, i, j); //Set up all chess pieces
			  }
		 }
		 setColor();
		 setTheme();
	});

	//==============CLICK EVENTS==================//

		$(function() {
			 //Option menu
			 $('#option').on('click', function() {
				  if($('#option-menu').hasClass('hide')) {
						$('#game').css('opacity', '0.3');
						$('#option-menu').removeClass('hide');
				  } else {
						$('#game').css('opacity', '1');
						$('#option-menu').addClass('hide');
				  }
			 });

			 //Back button
			 //Return to game
			 $('#back-btn').on('click', function() {
				  $('#option-menu').addClass('hide');
				  $('#game').css('opacity', '1');
			 });
			
		 //Undo button 
		 $('#undo-btn').on('click', function() {
			  if(historyMoves.length === 0) {
					return;
			  }

			  var move = historyMoves.pop();

			  var previous = move.previous;        
			  setPiece($('#' + previous.box), previous.piece.split('-')[0], previous.piece.split('-')[1]);

			  var current = move.current;
			  if(current.piece === '') {
					var currentBox = $('#' + current.box);
					currentBox.html('');
					currentBox.attr('piece', '');
					currentBox.removeClass('placed');
			  } else {
					setPiece($('#' + current.box), current.piece.split('-')[0], current.piece.split('-')[1]);
			  }

			  //Reset all changes
			  $('.box').removeClass('selected');
			  $('.box').removeClass('suggest');

			  switchPlayer();

			  select = { canMove: false, piece: '', box: '' };
		 });

		 //Pawn promotion event
		 $('#pawn-promotion-option .option').on('click', function() {

			  var newType = $(this).attr('id');
			  promotion.box.html(chessPieces[promotion.color][newType]);
			  promotion.box.addClass('placed');
			  promotion.box.attr('piece', promotion.color + '-' + newType);

			  $('#pawn-promotion-option').addClass('hide');
			  $('#game').css('opacity', '1');

			  promotion = {};
		 });

		 //Reset game
		 $('#restart-btn').on('click', function() {
			  resetGame(); 
		 });

		 //Restart when game over
		 $('#result').on('click', function() {
			  resetGame();
		 });

		 //Box click event
		 $('.box').on('click', function() {
			  if($(this).hasClass('selected')) { //Undo to select new box
					$(this).removeClass('selected');

					$('.box').removeClass('suggest');
					select = { canMove: false, piece: '', box: '' };
					return;
			  }

			  //Select new box
			  if(!select.canMove) {
					//Check the right color to play
					if($(this).attr('piece').indexOf(player) >= 0) {
						 //Select a piece to move
						 selectPiece($(this));
					}
			  }

			  //Set up new destination for selected box
			  else if(select.canMove) { 
					var selectedPieceInfo = select.piece.split('-');
					var color = selectedPieceInfo[0];
					var type = selectedPieceInfo[1];

					//Select new piece to move if 2 colors are the same
					if($(this).attr('piece').indexOf(color) >= 0) {
						 $('#' + select.box).removeClass('selected');
						 $('.box').removeClass('suggest');
						 //Select a piece to move
						 selectPiece($(this));
						 return;
					}

					//Can move if it is valid
					if($(this).hasClass('suggest')) { 

						 //Save move in history
						 var move = {
							  previous: {},
							  current: {}
						 }

						 move.previous.piece = select.piece;
						 move.previous.box = select.box;

						 move.current.piece = $(this).attr('piece');
						 move.current.box = $(this).attr('id');

						 historyMoves.push( move );

						 //Move selected piece successfully
						 setPiece($(this), color, type);

						 //Delete moved box
						 deleteBox($('#' + select.box));

						 $('.box').removeClass('suggest');

						 select = { canMove: false, piece: '', box: '' };

						 //Switch player
						 switchPlayer();
					}
			  }
		 });
	});

	//Get piece and position of the selected piece
	var selectPiece = function(box) {
		 box.addClass('selected');
		 select.box = box.attr('id');
		 select.piece = box.attr('piece');
		 select.canMove = true;

		 suggestNextMoves(getNextMoves(select.piece, select.box));
	}

	//CALCULATE VALID MOVES=======//

	//Returns possible moves of the selected piece
	var getNextMoves = function(selectedPiece, selectedBox) {
		 var selectedPieceInfo = selectedPiece.split('-');
		 var color = selectedPieceInfo[0];
		 var type = selectedPieceInfo[1];

		 var id = selectedBox.split('-');
		 var i = parseInt(id[1]);
		 var j = parseInt(id[2]);

		 var nextMoves = [];

		 switch(type) {
			  case 'pawn':
					if(color === 'black') {
						 var moves = [
							  [0, 1], [0, 2], [1, 1], [-1, 1]
						 ];
					} else {
						 var moves = [
							  [0, -1], [0, -2], [1, -1], [-1, -1]
						 ];
					}
					nextMoves = getPawnMoves(i, j, color, moves);
					break;
			  case 'rook':
					var moves = [
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = getQueenMoves(i, j, color, moves);
					break;
			  case 'knight':
					var moves = [
						 [-1, -2], [-2, -1], [1, -2], [-2, 1],
						 [2, -1], [-1, 2], [2, 1], [1, 2]
					];
					nextMoves = getKnightMoves(i, j, color, moves);
					break;
			  case 'bishop':
					var moves = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1]
					];
					nextMoves = getQueenMoves(i, j, color, moves);
					break;
			  case 'queen':
					var moves1 = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1]
					];
					var moves2 = [
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = getQueenMoves(i, j, color, moves1)
									.concat(getQueenMoves(i, j, color, moves2));
					break;
			  case 'king':
					var moves = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1],
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = getKnightMoves(i, j, color, moves);
					break;
			  default: 
					break;
		 }
		 return nextMoves;
	}

	//Calculate next moves for pawn pieces
	var getPawnMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var index = 0; index < moves.length; index++) {
			  var tI = i + moves[index][0];
			  var tJ = j + moves[index][1];
			  if( !outOfBounds(tI, tJ) ) {
					var box = $('#box-' + tI + '-' + tJ);

					if(index === 0) { //First line
						 if(!box.hasClass('placed')) {
							  nextMoves.push([tI, tJ]);
						 } else {
							  index++;
						 }
					} else if(index === 1) { //First line
						 if( ((color === 'black' && j === 1) ||
								 (color === 'white' && j === 6)) &&
							  !box.hasClass('placed')) {
							  nextMoves.push([tI, tJ]);
						 }
					} else if(index > 1) { //Other lines
						 if(box.attr('piece') !== '' && box.attr('piece').indexOf(color) < 0) {
							  nextMoves.push([tI, tJ]);
						 }
					}
			  }
		 }
		 return nextMoves;
	}

	//Calculate next move of rook, bishop and queen pieces
	var getQueenMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var move of moves) {
			  var tI = i + move[0];
			  var tJ = j + move[1];
			  var sugg = true;
			  while(sugg && !outOfBounds(tI, tJ)) {
					var box = $('#box-' + tI + '-' + tJ);
					if(box.hasClass('placed')) {
						 if(box.attr('piece').indexOf(color) >= 0) {
							  sugg = false;
						 } else {
							  nextMoves.push([tI, tJ]);
							  sugg = false;
						 }
					}
					if(sugg) {
						 nextMoves.push([tI, tJ]);
						 tI += move[0];
						 tJ += move[1];
					}
			  }
		 }
		 return nextMoves;
	}

	//Calculate next moves for knight or king pieces
	var getKnightMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var move of moves) {
			  var tI = i + move[0];
			  var tJ = j + move[1];
			  if( !outOfBounds(tI, tJ) ) {
					var box = $('#box-' + tI + '-' + tJ);
					if(!box.hasClass('placed') || box.attr('piece').indexOf(color) < 0) {
						 nextMoves.push([tI, tJ]);
					}
			  }
		 }
		 return nextMoves;
	}

	//Check if position i, j is in the board game
	var outOfBounds = function(i, j) {
		 return ( i < 0 || i >= 8 || j < 0 || j >= 8 );
	}

	//Show possible moves by add suggestion to boxes
	var suggestNextMoves = function(nextMoves) {
		 for(var move of nextMoves) {
			  var box = $('#box-' + move[0] + '-' + move[1]);
			  box.addClass('suggest');
		 }
	}

	//=============================================//

	//Set up piece for clicked box
	var setPiece = function(box, color, type) {

		 //Check end game (if king is defeated)
		 if(box.attr('piece').indexOf('king') >= 0) {
			  showWinner(player);

			  box.html(chessPieces[color][type]);
			  box.addClass('placed');
			  box.attr('piece', color + '-' + type);

			  return;
		 }

		 //Check if pawn reached the last line
		 var j = parseInt(box.attr('id').charAt(6));
		 if(type === 'pawn') {
			  if( (player === 'black' && j === 7) ||
					(player === 'white' && j === 0)) {
					$('#game').css('opacity', '0.5');

					var option = $('#pawn-promotion-option');
					option.removeClass('hide');
					option.find('#queen').html(chessPieces[player].queen);
					option.find('#rook').html(chessPieces[player].rook);
					option.find('#knight').html(chessPieces[player].knight);
					option.find('#bishop').html(chessPieces[player].bishop);

					promotion = { box: box, color: color };

					return;
			  }
		 }

		 box.html(chessPieces[color][type]);
		 box.addClass('placed');
		 box.attr('piece', color + '-' + type);
	}

	//Delete selected element
	var deleteBox = function(box) {
		 box.removeClass('placed');
		 box.removeClass('selected');
		 box.removeClass('suggest');
		 box.html('');
		 box.attr('piece', '');
	}

	//Default board state
	var setNewBoard = function(box, i, j) {
		 if(j === 7) {
			  if(i === 0 || i === 7) {
					setPiece(box, 'white', 'rook');
			  } else if(i === 1 || i === 6) {
					setPiece(box, 'white', 'knight');
			  } else if(i === 2 || i === 5) {
					setPiece(box, 'white', 'bishop');
			  } else if(i === 3) {
					setPiece(box, 'white', 'queen');
			  } else if(i === 4) {
					setPiece(box, 'white', 'king');
			  }
		 } else if(j === 6) {
			  setPiece(box, 'white', 'pawn');
		 } else if(j === 1) {
			  setPiece(box, 'black', 'pawn');
		 } else if(j === 0) {
			  if(i === 0 || i === 7) {
					setPiece(box, 'black', 'rook');
			  } else if(i === 1 || i === 6) {
					setPiece(box, 'black', 'knight');
			  } else if(i === 2 || i === 5) {
					setPiece(box, 'black', 'bishop');
			  } else if(i === 3) {
					setPiece(box, 'black', 'queen');
			  } else if(i === 4) {
					setPiece(box, 'black', 'king');
			  }
		 }
	}

	//Switch player
	var switchPlayer = function() {
		 if(player === 'black') {
			  $('#player').html(chessPieces.white.king);
			  player = 'white';
		 } else {
			  $('#player').html(chessPieces.black.king);
			  player = 'black';
		 }
	}

	//Restart game
	var resetGame = function() {
		 deleteBox($('.box'));
		 $('#player').html(chessPieces.black.king);
		 $('#result').addClass('hide');
		 $('#option-menu').addClass('hide');
		 $('#game').css('opacity', '1');

		 //Set up color for boxes, chess pieces
		 for(var i = 0; i < 8; i++) {
			  for(var j = 0; j < 8; j++) {
					var box = $('#box-' + i + '-' + j);
					setNewBoard(box, i, j);
			  }
		 }

		 //Set global variables to default
		 player = 'black';
		 select = {
			  canMove: false,
			  piece: '',
			  box: ''
		 };

		 historyMoves = [];
		 promotion = {};
	}

	//Announce the winner
	var showWinner = function(winner) {

		 historyMoves = [];
		 promotion = {};

		 setTimeout(function() {
			  if(winner === 'DRAW') { //Game is draw
					$('#result').css('color', '#000');
					$('#result').html(winner);
			  } else { //There is a winner
					$('#result').css('color', winner + '');
					$('#result').html(chessPieces[winner].king + ' wins!');
			  }
			  $('#result').removeClass('hide');
			  $('#game').css('opacity', '0.5');
		 }, 1000);
	}
    
});