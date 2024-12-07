
import { useEffect, useState } from "react";

const width = 8;
const candyColors = [
   'blue',
   'green',
   'orange',
   'purple',
   'red',
   'yellow',
    
]

const App = () => {
  const [currentColorArragement, setCurrentColorArragement] = useState([])

  const checkForColumnOfFour = () => {
    for(let i = 0; i < 39; i++){
      const columnOfFour = [i, i+width, i+width*2, i+width*3];
      const decidedColor = currentColorArragement[i];
      if(columnOfFour.every(sqaure => currentColorArragement[sqaure] === decidedColor)){
        columnOfFour.forEach(sqaure => currentColorArragement[sqaure] = '')
      }
    }
  }

  const checkForColumnOfThree = () => {
    for(let i = 0; i < 47; i++){
      const columnOfThree = [i, i+width, i+width*2];
      const decidedColor = currentColorArragement[i];
      if(columnOfThree.every(sqaure => currentColorArragement[sqaure] === decidedColor)){
        columnOfThree.forEach(sqaure => currentColorArragement[sqaure] = '')
      }
    }
  }

  const checkForRowOfFour = () => {
    for(let i = 0; i < 47; i++){
      const rowOfFour = [i, i+1, i+2, i+3];
      const decidedColor = currentColorArragement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];

      if(notValid.includes(i)){
        continue;
      }

      if(rowOfFour.every(sqaure => currentColorArragement[sqaure] === decidedColor)){
        rowOfFour.forEach(sqaure => currentColorArragement[sqaure] = '')
      }
    }
  }

  const checkForRowOfThree = () => {
    for(let i = 0; i < 47; i++){
      const rowOfThree = [i, i+1, i+2];
      const decidedColor = currentColorArragement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      if(notValid.includes(i)){
        continue;
      }

      if(rowOfThree.every(sqaure => currentColorArragement[sqaure] === decidedColor)){
        rowOfThree.forEach(sqaure => currentColorArragement[sqaure] = '')
      }
    }
  }

  const moveIntoSqaureBelow = ()  => {
    for(let i = 0; i < 64 - width;  i++){
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if(isFirstRow && currentColorArragement[i] === ''){
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArragement[i] = candyColors[randomNumber];
      }

      if((currentColorArragement[i + width]) === ''){
        currentColorArragement[i+width] = currentColorArragement[i];
        currentColorArragement[i] = '';
      }
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

  console.log(currentColorArragement);

  return (
    <div>

    <div className="app">
      <div className = "game">
        {currentColorArragement.map((candyColor, index) =>(
          <img 
            alt = {candyColor}
            key={index}
            style={{backgroundColor: candyColor}}
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
