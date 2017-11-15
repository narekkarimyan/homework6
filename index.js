  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  const grid = new Image();
  grid.src = 'grid.png';
  
  const krestik = new Image();
  krestik.src = 'krestik.png';
  const nolik = new Image();
  nolik.src ='nolik.png';
  
  let isUser = true	;
  const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  const nextMove = function(x){
    for (let i=0;i<x.length;i++){
      for (let j=0;j<x.length;j++){
        if(x[i][j]===" "){
          return [i,j];				
        }
      }
      
    }
  };
  const makeMove = function(board, cordinate, isX) {
    if((cordinate[0] === 0 || cordinate[0] === 1 || cordinate[0] === 2) && (cordinate[1] === 0 || cordinate[1] === 1 || cordinate[1] === 2)) {
      if(isX) {
        board[cordinate[0]][cordinate[1]] = 'x';
      } else {
        board[cordinate[0]][cordinate[1]] = 'o';
      }
      return 0;
    }
    return -1;
  };
  
  const checker = function(board){
    for(i=0;i<board.length;i++){
      if(board[i][0]===board[i][1] && board[i][1]===board[i][2] && board[i][1]!==' '){
        return {
          winner: board[i][0],
          winningSpots: [[i,0],[i,1],[i,2]]
        } 
      }
    }
    for(i=0;i<board.length;i++){
      if(board[0][i]===board[1][i] && board[1][i]===board[2][i] && board[1][i]!==' '){
        return {
          winner: board[0][i],
          winningSpots: [[0,i],[0,i],[0,i]]
        } 
      }
    }
    if(board[0][0]===board[1][1] && board[1][1]===board[2][2] && board[0][0]!==' '){
      return {
        winner: board[1][1],
        winningSpots: [[0,0],[1,1],[2,2]]
      } 
    }
    if(board[0][2]===board[1][1] && board[1][1]===board[2][0] && board[0][2]!==' '){
      return {
        winner: board[1][1],
        winningSpots: [[0,2],[1,1],[2,0]]
      } 
    }
    if(!board.toString().includes(' ')){
      return {
        winner: 'no winner'
      }
    }
  };	
  
 
  const drawGrid = function(){
      ctx.drawImage(grid, 0, 0,canvas.width,canvas.height);
  };
  const drawKrestik = function(x,y){
    ctx.drawImage(krestik, x, y,150,150);
  };
  const drawNolik = function(x,y){
    ctx.drawImage(nolik, x, y,150,150);
  };
  grid.onload = drawGrid;
  
  const first = function() {
    if(!isUser) {
      const next = nextMove(board);
      if(makeMove(board, next) === 0) {
        makeMove(board, next);
        drawNolik(next[1] * (canvas.width / 3), next[0] * (canvas.width / 3));
      }
    }
    isUser = !isUser;
  };
  first();
  let isWin = false;
  let isFirst = false;
  canvas.addEventListener('mousedown', function(e) {
    if(board[Math.floor(e.offsetY/(canvas.width / 3))][Math.floor(e.offsetX/(canvas.width / 3))] === ' ') {
      board[Math.floor(e.offsetY/(canvas.width / 3))][Math.floor(e.offsetX/(canvas.width / 3))] = 'x';
      drawKrestik(Math.floor(e.offsetX/(canvas.width / 3)) * (canvas.width / 3), 
        Math.floor(e.offsetY/(canvas.width / 3)) * (canvas.width / 3));
      isFirst = false;
      isUser = false;
    }
    if(isWin) {
      for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board.length; j++) {
          board[i][j] = ' ';
        }
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      isWin = false;
      isUser = !isUser;
      first();
      isFirst = true;
    }
    if(checker(board)) {
      isWin = true;
    }
  });
  canvas.addEventListener('mouseup', function(e) {
    if(!isFirst && !isWin && !isUser) {
      isUser = true;
      const next = nextMove(board);
      if(makeMove(board, next) === 0) {
        makeMove(board, next);
        drawNolik(next[1] * (canvas.width / 3), next[0] * (canvas.width / 3));
      }
      if(checker(board)) {
        isWin = true;
      }
    }
  });