
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
  const [currentColorArragement, setCurrentColorArragement] = useState([]);

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

  console.log(currentColorArragement);

  return (
    <div>

    <div className="app">
      <div className = "game">
        {currentColorArragement.map((candyColor, index) =>(
          <img 
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
