var player2Icon = 'X';
var playerIcon = 'O';
var currentPlayer = 1; // Initialize currentPlayer to Player 1
var TwoMove;
var liveBoard = [1, -1, -1, -1, 1, 1, 1, -1, -1];
var winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function renderBoard(board) {
    board.forEach(function(el, i) {
      var squareId = '#' + i.toString();
      if (el === -1) {
        $(squareId).text(playerIcon);
      } else if (el === 1) {
        $(squareId).text(player2Icon);
      }
    });
    
    $('.square:contains(X)').addClass('x-marker');
    $('.square:contains(O)').addClass('o-marker');
  }
  
  function animateWinLine() {
    var idxOfArray = winningLines.map(function(winLines) {
      return winLines.map(function(winLine) {
        return liveBoard[winLine];
      }).reduce(function(prev, cur) {
        return prev + cur;
      });
    });
    var squaresToAnimate = winningLines[idxOfArray.indexOf(Math.abs(3))];
    
    squaresToAnimate.forEach(function(el) {
        $('#' + el).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
      });
  }

  function chooseMarker() {
    $('.modal-container').css('display', 'block');
    $('.choose-modal').addClass('animated bounceInUp');
    
    $('.button-area span').click(function() {
      var marker = $(this).text();
      playerIcon = (marker === 'X' ? 'X' : 'O');
      player2Icon = (marker === 'X' ? 'O' : 'X');
  
      $('.choose-modal').addClass('animated bounceOutDown');
      setTimeout(function() {
        $('.modal-container').css('display', 'none');
        $('.choose-modal').css('display','none');
        startNewGame();
      }, 700);
      
      $('.button-area span').off();
    });
  }
  function endGameMessage() {
    var result = checkVictory(liveBoard);
    var message = '';
  
    if (result === 'win') {
      if (currentPlayer === 1) {
        message = 'Player 1 won!';
      } else {
        message = 'Player 2 won!';
      }
    } else if (result === 'lose') {
      if (currentPlayer === 1) {
        message = 'Player 2 won!';
      } else {
        message = 'Player 1 won!';
      }
    } else {
      message = "It's a draw";
    }
  
    $('.end-game-modal h3').text(message);
    $('.modal-container').css('display', 'block');
    $('.end-game-modal').css('display', 'block').removeClass('animated bounceOutDown').addClass('animated bounceInUp');
  
    $('.button-area span').click(function () {
      $('.end-game-modal').removeClass('animated bounceInUp').addClass('animated bounceOutDown');
  
      setTimeout(function () {
        $('.modal-container').css('display', 'none');
        startNewGame();
      }, 700);
  
      $('.button-area span').off();
    });
  }
  
  function startNewGame() {
    liveBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    $('.square').text("").removeClass('o-marker x-marker');
    renderBoard(liveBoard);
    playerTakeTurn();
  }
  function playerTakeTurn() {
    $('.square:empty').hover(function() {
      $(this).text(playerIcon).css('cursor', 'pointer');
    }, function() {
      $(this).text('');
    });
  
    $('.square:empty').click(function() {
      $(this).css('cursor', 'default');
      var squareId = parseInt($(this).attr('id'));
  
      if (liveBoard[squareId] === 0) { 
        liveBoard[squareId] = -1;
        renderBoard(liveBoard);
  
        if (checkVictory(liveBoard)) {    
          setTimeout(endGameMessage, (checkVictory(liveBoard) === 'win') ? 700 : 100);
        } else {
          setTimeout(playerTwoTakeTurn, 100);
        }
      }
      $('.square').off();
    });
  }
  
  function playerTwoTakeTurn() {
    $('.square:empty').hover(function() {
      $(this).text(player2Icon).css('cursor', 'pointer');
    }, function() {
      $(this).text('');
    });
  
    $('.square:empty').click(function() {
      $(this).css('cursor', 'default');
      var squareId = parseInt($(this).attr('id'));
  
      if (liveBoard[squareId] === 0) { 
        liveBoard[squareId] = 1; 
        renderBoard(liveBoard);
  
        if (checkVictory(liveBoard)) {
          setTimeout(endGameMessage, (checkVictory(liveBoard) === 'win') ? 700 : 100);
        } else {
          setTimeout(playerTakeTurn, 100);
        }
      }
      $('.square').off();
    });
  } 
   function checkVictory(board) {
    for (var i = 0; i < winningLines.length; i++) {
      var [a, b, c] = winningLines[i];
      if (board[a] === 1 && board[b] === 1 && board[c] === 1) {
        return 'win';
      }
      if (board[a] === -1 && board[b] === -1 && board[c] === -1) {
        return 'lose';
      }
    }
  
    if (board.includes(0)) {
      return false; 
    } else {
      return 'draw';
    }
  }
  
  function availableMoves(board) {
    return board.map(function(el, i) {
      if (!el) {
        return i;
      }
    }).filter(function(e) {
      return (typeof e !== "undefined");
    });
  }
  renderBoard(liveBoard);
  chooseMarker();
  
  
  
  



