
import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'


const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
]

const App = () => {
  const [currentColorArragement, setCurrentColorArragement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);


  const checkForColumnOfFour = () => {
    for(let i = 0; i <= 39; i++){
      const columnOfFour = [i, i+width, i+width*2, i+width*3];
      const decidedColor = currentColorArragement[i];
      const isBlank = currentColorArragement[i] === blank;


      if(columnOfFour.every(sqaure => currentColorArragement[sqaure] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(sqaure => currentColorArragement[sqaure] = blank)
        return true;
      }
    }
  }

  const checkForRowOfFour = () => {
    for(let i = 0; i < 64; i++){
      const rowOfFour = [i, i+1, i+2, i+3];
      const decidedColor = currentColorArragement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentColorArragement[i] === blank;

      if(notValid.includes(i)){
        continue;
      }

      if(rowOfFour.every(sqaure => currentColorArragement[sqaure] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(sqaure => currentColorArragement[sqaure] = blank)
        return true;
      }
    }
  }

  const checkForColumnOfThree = () => {
    for(let i = 0; i <= 47; i++){
      const columnOfThree = [i, i+width, i+width*2];
      const decidedColor = currentColorArragement[i];
      const isBlank = currentColorArragement[i] === blank;
      if(columnOfThree.every(sqaure => currentColorArragement[sqaure] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(sqaure => currentColorArragement[sqaure] = blank)
        return true;
      }
    }
  }

  

  const checkForRowOfThree = () => {
    for(let i = 0; i < 64; i++){
      const rowOfThree = [i, i+1, i+2];
      const decidedColor = currentColorArragement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = currentColorArragement[i] === blank;
      if(notValid.includes(i)){
        continue;
      }

      if(rowOfThree.every(sqaure => currentColorArragement[sqaure] === decidedColor) && !isBlank){
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(sqaure => currentColorArragement[sqaure] = blank)
        return true;
      }
    }
  }

  const moveIntoSqaureBelow = ()  => {
    for(let i = 0; i <= 55;  i++){
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if(isFirstRow && currentColorArragement[i] === blank){
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArragement[i] = candyColors[randomNumber];
      }

      if((currentColorArragement[i + width]) === blank){
        currentColorArragement[i+width] = currentColorArragement[i];
        currentColorArragement[i] = blank;
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target)

  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  }

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));
    
    currentColorArragement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
    currentColorArragement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

    const validMoves = [
      squareBeingDraggedId -1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if(squareBeingReplacedId &&
       validMove &&
        (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)){
          setSquareBeingDragged(null)
          setSquareBeingReplaced(null)
    }else{
      currentColorArragement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
      currentColorArragement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
      setCurrentColorArragement([...currentColorArragement]);
    }
  }

  const createBoard = () => {
    const randomColorArrangement = []
    for(let i=0; i<width*width; i++){
      const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArragement(randomColorArrangement);    
  }

  useEffect( () => {
    createBoard()
  }, [])

  useEffect(() =>{
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSqaureBelow();
      setCurrentColorArragement([...currentColorArragement]);
    }, 100)

    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSqaureBelow, currentColorArragement])

  return (
    <div>

    <div className="app">
      <div className = "game">
        {currentColorArragement.map((candyColor, index) =>(
          <img 
            alt = {candyColor}
            src={candyColor}
            key={index}
            data-id = {index}
            draggable = {true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop = {dragDrop}
            onDragEnd = {dragEnd}
            style={{backgroundColor: candyColor}}
          />
        ))}
      </div>
      <ScoreBoard score = {scoreDisplay} />
    </div>
    </div>
  );
}

export default App;
