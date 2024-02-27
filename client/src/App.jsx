import { useEffect, useState } from "react";
import "./App.css";
import Square from "./Square/Square";

const renderForm = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
function App() {
  const [gameState, setGameState] = useState(renderForm);
  const [currentPlayer, setCurrentPlayer] = useState("circle");

  const [finishState, setFinishState] = useState(false);
  const [finishArrayState, setFinishArrayState] = useState([]);
  const [playingOnline, setPlayingOnline] = useState(false);
  const checkWinner = () => {
    //column dynamic
    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[0][col] === gameState[2][col]
      ) {
        setFinishArrayState([0*3+col,1*3+col,2*3+col]);
        return gameState[0][col];
      }
    }
    // row dynamic
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][0] === gameState[row][2]
      ) {
        setFinishArrayState([row*3+0,row*3+1,row*3+2]);
        return gameState[row][0];
      }
    }
    //diagonal
    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[0][0] === gameState[2][2]
    ) {
      setFinishArrayState([0*3+0,1*3+1,2*3+2]);
      return gameState[0][0];
    }
    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[0][2] === gameState[2][0]
    ) {
      setFinishArrayState([0*3+2,1*3+1,2*3+0]);
      return gameState[0][2];
    }
    //draw match
    const isDrawMatch = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") 

      return true;
    });

    if (isDrawMatch) {
      return "draw";
    }
    //no one wins
    return null;
  };
  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishState(winner);
    }
  }, [gameState]);

  if(!playingOnline){
    return <div className="main-div">
      <button onClick={()=>setPlayingOnline(true)} className="play-online">Play Online</button>
    </div>
  }
  return (
    <>
      <div className="main-div">
        <div className="move-detection">
          <div className="left">YourSelf</div>
          <div className="right">Opponent</div>
        </div>
        <div>
          <h1 className="game-heading light-background">Tic Tac Toe</h1>
          <div className="square-wrapper">
            {gameState.map((arr, rowIndex) =>
              arr.map((e, colIndex) => {
                return (
                  <Square
                  finishArrayState={finishArrayState}
                    finishState={finishState}
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    setGameState={setGameState}
                    id={rowIndex * 3 + colIndex}
                    key={rowIndex * 3 + colIndex}
                  />
                );
              })
            )}
          </div>
          {finishState && finishState === "draw" && (
            <h3 className="finish-state">Match is Drawn </h3>
          )}
          {finishState && finishState !== "draw" && (
            <h3 className="finish-state">{finishState} won the Game</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
