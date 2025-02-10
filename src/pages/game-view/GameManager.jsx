function GameManager() {
    // const chessBoard = useState([])

    let countRow = 1
    let columns = 'ABCDEFGH'
    const checkeredBoard = []

    for (let index = 0; index < 64; index++) {
        if (index != 0) {
            if ((index)%8 == 0) {
                countRow++
            }
        }
        let currentColumn = (index)%8
        let rowID = columns[currentColumn] + ' - ' + countRow
        let rowColor = (countRow%2 == 0) ? (currentColumn%2 == 0) : (currentColumn%2 != 0)
        checkeredBoard.push(<div className={ 'chess-square ' + ( rowColor ? 'even-square' : 'odd-square')}
                                 id={rowID}
                                 key={rowID}
                            >
                            </div>)
    }
    // function PrepareMovements(piece) {
    //     //calculatePossiblechoices
    //     //displayPossibleChoices
    // }

    // function MovePiece(targetPosition) {
    // }
    return (
        <>
            <div className='checkeredBoardContainer'>
                <div className="checkeredBoard">
                    {checkeredBoard}
                </div>
            </div>
        </>
    )
}
export default GameManager
