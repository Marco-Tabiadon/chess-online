import { useState } from 'react'
import ChessBoard from './ChessBoard.jsx';

function GameManager() {
    const [initialize, setInitialize] = useState(true)

    // function PrepareMovements(piece) {
    //     //calculatePossiblechoices
    //     //displayPossibleChoices
    // }

    return (
        <>
            <ChessBoard
                initialize={initialize}
                communicateChessboardIsSet={() =>  setTimeout(() => {
                    setInitialize(false)
                })}
            ></ChessBoard>
        </>
    )
}

// qui quando inizia gioco initialize che cascade down

export default GameManager;
